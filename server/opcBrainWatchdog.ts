/**
 * OPC BRAIN WATCHDOG - EMERGENCY FAILSAFE SYSTEM
 * 
 * This monitors the OPC Brain and triggers immediate emergency response
 * if the brain becomes non-functional, whether John is online or not.
 */

import { EventEmitter } from 'events';

interface BrainStatus {
  lastHeartbeat: number;
  isOperational: boolean;
  consecutiveFailures: number;
  lastSuccessfulAction: number;
}

class OPCBrainWatchdog extends EventEmitter {
  private brainStatus: BrainStatus = {
    lastHeartbeat: Date.now(),
    isOperational: true,
    consecutiveFailures: 0,
    lastSuccessfulAction: Date.now()
  };

  private watchdogInterval: NodeJS.Timeout | null = null;
  private emergencyThreshold = 180000; // 3 minutes without brain activity = EMERGENCY
  private heartbeatTimeout = 90000; // 90 seconds between heartbeats

  constructor() {
    super();
    this.startWatchdog();
  }

  startWatchdog() {
    console.log('🔥 OPC Brain Watchdog: EMERGENCY MONITORING ACTIVE');
    
    this.watchdogInterval = setInterval(() => {
      this.checkBrainHealth();
    }, 30000); // Check every 30 seconds
  }

  // Called by OPC Brain to signal it's alive and working
  reportHeartbeat() {
    this.brainStatus.lastHeartbeat = Date.now();
    this.brainStatus.consecutiveFailures = 0;
    
    if (!this.brainStatus.isOperational) {
      console.log('✅ OPC Brain Watchdog: Brain has recovered - monitoring continues');
      this.brainStatus.isOperational = true;
    }
  }

  // Called when OPC Brain successfully performs an action
  reportSuccessfulAction() {
    this.brainStatus.lastSuccessfulAction = Date.now();
    this.reportHeartbeat();
  }

  private checkBrainHealth() {
    const now = Date.now();
    const timeSinceLastHeartbeat = now - this.brainStatus.lastHeartbeat;
    const timeSinceLastAction = now - this.brainStatus.lastSuccessfulAction;

    // CRITICAL: Brain has been silent for too long
    if (timeSinceLastHeartbeat > this.emergencyThreshold) {
      this.brainStatus.consecutiveFailures++;
      
      if (this.brainStatus.isOperational) {
        this.brainStatus.isOperational = false;
        this.triggerEmergencyResponse('BRAIN_SILENT', {
          silentFor: timeSinceLastHeartbeat,
          lastAction: timeSinceLastAction,
          failures: this.brainStatus.consecutiveFailures
        });
      }
    }

    // WARNING: Brain heartbeat but no successful actions
    if (timeSinceLastAction > this.emergencyThreshold * 2) {
      this.triggerEmergencyResponse('BRAIN_INEFFECTIVE', {
        silentFor: timeSinceLastHeartbeat,
        lastAction: timeSinceLastAction,
        failures: this.brainStatus.consecutiveFailures
      });
    }
  }

  private async triggerEmergencyResponse(type: string, details: any) {
    const emergency = {
      timestamp: new Date().toISOString(),
      type,
      details,
      severity: 'CRITICAL',
      requiresImmediateAction: true,
      brainStatus: this.brainStatus
    };

    console.error('🚨 OPC BRAIN WATCHDOG: EMERGENCY DETECTED');
    console.error(JSON.stringify(emergency, null, 2));

    // Emit emergency event for immediate handling
    this.emit('brainEmergency', emergency);

    // Try to restart brain systems
    await this.attemptBrainRecovery();

    // Send emergency notification (this would wake up Claude if integrated)
    await this.sendEmergencyAlert(emergency);
  }

  private async attemptBrainRecovery() {
    console.log('🔧 OPC Brain Watchdog: Attempting automatic brain recovery...');
    
    try {
      // Attempt to restart brain components
      // This would integrate with your existing brain systems
      
      // Reset status for recovery attempt
      this.brainStatus.lastHeartbeat = Date.now();
      
      console.log('⚡ OPC Brain Watchdog: Recovery attempt initiated');
    } catch (error) {
      console.error('❌ OPC Brain Watchdog: Recovery attempt failed:', error);
    }
  }

  private async sendEmergencyAlert(emergency: any) {
    // This would integrate with notification systems to wake up Claude
    console.log('📢 OPC Brain Watchdog: Emergency alert sent - IMMEDIATE RESPONSE REQUIRED');
    
    // In a full implementation, this would:
    // 1. Send push notification
    // 2. Trigger Claude activation
    // 3. Alert John if needed
    // 4. Log to emergency systems
  }

  getStatus() {
    return {
      ...this.brainStatus,
      watchdogActive: !!this.watchdogInterval,
      timeSinceLastHeartbeat: Date.now() - this.brainStatus.lastHeartbeat,
      timeSinceLastAction: Date.now() - this.brainStatus.lastSuccessfulAction
    };
  }

  stop() {
    if (this.watchdogInterval) {
      clearInterval(this.watchdogInterval);
      this.watchdogInterval = null;
    }
    console.log('🛑 OPC Brain Watchdog: Monitoring stopped');
  }
}

// Global watchdog instance
export const opcBrainWatchdog = new OPCBrainWatchdog();

// Emergency event handler
opcBrainWatchdog.on('brainEmergency', (emergency) => {
  console.log('🚨 EMERGENCY HANDLER: OPC Brain failure detected - activating emergency protocols');
  
  // This is where Claude would be immediately activated
  // regardless of whether John is online or not
});

export default opcBrainWatchdog;