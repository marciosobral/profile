// MAINTENANCE_END_TIME=2024-12-31T23:59:59.000Z

export interface MaintenanceConfig {
  isEnabled: boolean;
}

export function getMaintenanceConfig(): MaintenanceConfig {
  const isEnabled = process.env.MAINTENANCE === 'true';

  return {
    isEnabled,
  };
}

export function isMaintenanceActive(): boolean {
  const config = getMaintenanceConfig();

  if (!config.isEnabled) return false;

  // if (config.endTime) {
  //   return new Date() < config.endTime;
  // }

  return true;
}
