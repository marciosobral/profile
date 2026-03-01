import commonMessages from './common/en-US.json';
import homeMessages from './home/en-US.json';
import maintenanceMessages from './maintenance/en-US.json';

export type Messages = typeof commonMessages &
  typeof homeMessages &
  typeof maintenanceMessages;
