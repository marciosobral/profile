import commonMessages from './common/en-US.json';
import homeMessages from './home/en-US.json';
import maintenanceMessages from './maintenance/en-US.json';

type NamespaceContent<T> = T extends { metadata: any; [K: string]: any }
  ? Omit<T, 'metadata'>
  : T;

export type Messages = NamespaceContent<typeof commonMessages> &
  NamespaceContent<typeof homeMessages> &
  NamespaceContent<typeof maintenanceMessages>;
