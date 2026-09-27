import PageHeader from '../../components/PageHeader'
export default function StudentNotifications(){
 const items=[['Reservation confirmed','Your shuttle seat has been reserved.'],['Live tracking ready','Open live tracking before departure.'],['QR boarding','Keep your boarding pass ready.']]
 return <><PageHeader title="Notifications" subtitle="Important shuttle updates"/><div className="panel-list">{items.map(x=><div className="panel" key={x[0]}><h3>{x[0]}</h3><p>{x[1]}</p></div>)}</div></>
}
