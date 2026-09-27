export const formatDateTime = value => {
  if(!value) return 'Not scheduled'
  const d=new Date(value); if(Number.isNaN(d.getTime())) return 'Invalid date'
  return new Intl.DateTimeFormat(undefined,{weekday:'short',month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}).format(d)
}
export const formatTime = value => {
  const d=new Date(value); return Number.isNaN(d.getTime())?'—':new Intl.DateTimeFormat(undefined,{hour:'numeric',minute:'2-digit'}).format(d)
}
