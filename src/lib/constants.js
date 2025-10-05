export const DAYS = [
  { key: 'mon', label: 'Pon' }, { key: 'tue', label: 'Wt' }, { key: 'wed', label: 'Śr' },
  { key: 'thu', label: 'Czw' }, { key: 'fri', label: 'Pt' }, { key: 'sat', label: 'Sob' },
  { key: 'sun', label: 'Ndz' },
];
export const defaultTypes = ['praca','nauka','spotkanie','trening','dom','inne'];
export const defaultPriorities = ['low','medium','high'];
export const emptyTask = {
  title:'', day:'mon', start:'', end:'', location:'', type:'inne', priority:'medium', notes:'', done:false
};
