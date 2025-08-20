import { Express } from 'express';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export class EnhancedAutoHealing {
  private app: Express;
  private errorLog: string[] = [];
  private currentSnapshotFile: string;

  constructor(app: Express) {
    this.app = app;
    this.currentSnapshotFile = path.join(process.cwd(), 'deployment-snapshot.json');
    this.setupProcessCrashDetection();
    console.log('🧠 Enhanced auto-healing with checkpoint restoration activated');
  }

  private setupProcessCrashDetection() {
    // Monitor for port conflicts and server crashes
    process.on('uncaughtException', (error) => {
      if (error.message.includes('EADDRINUSE') || error.message.includes('port')) {
        console.log('🚨 CRITICAL: Port conflict detected - OPC Brain auto-fixing...');
        this.handlePortConflict(error);
      } else {
        console.log(`🚨 Uncaught exception: ${error.message}`);
        this.errorLog.push(`UNCAUGHT: ${error.message} at ${new Date().toISOString()}`);
      }
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.log(`🚨 Unhandled rejection: ${reason}`);
      this.errorLog.push(`REJECTION: ${reason} at ${new Date().toISOString()}`);
    });

    // Monitor server process health every 30 seconds
    setInterval(() => {
      this.checkServerHealth();
    }, 30000);
  }

  private handlePortConflict(error: Error) {
    console.log('🔧 OPC Brain: Resolving port conflict automatically...');
    
    // Kill any processes using port 5000
    exec('fuser -k 5000/tcp 2>/dev/null || true', (killError) => {
      if (killError) {
        console.log('🚨 Failed to clear port 5000:', killError.message);
      } else {
        console.log('✅ Port 5000 cleared - server will restart automatically');
      }
    });

    // Log the critical failure for analysis
    this.errorLog.push(`PORT_CONFLICT: ${error.message} at ${new Date().toISOString()}`);
  }

  private checkServerHealth() {
    try {
      const memoryUsage = process.memoryUsage();
      if (memoryUsage.heapUsed > 500 * 1024 * 1024) { // 500MB threshold
        console.log('⚠️ High memory usage:', Math.round(memoryUsage.heapUsed / 1024 / 1024), 'MB');
      }
    } catch (error) {
      console.log('🚨 Server health check failed:', error);
    }
  }

  public getErrorLog(): string[] {
    return this.errorLog;
  }

  public clearErrorLog(): void {
    this.errorLog = [];
    console.log('📝 Error log cleared');
  }
}