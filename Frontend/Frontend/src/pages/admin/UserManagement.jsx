import {useEffect,useState} from 'react'
import PageHeader from '../../components/PageHeader'
import Modal from '../../components/Modal'
import Icon from '../../components/Icon'
import StatusBadge from '../../components/StatusBadge'
import EmptyState from '../../components/EmptyState'
import {api} from '../../services/mockApi'
import {useToast} from '../../context/ToastContext'

const empty={name:'',email:'',role:'STUDENT',universityId:''}
export default function UserManagement(){
 const [users,setUsers]=useState([]); const [edit,setEdit]=useState(null); const [del,setDel]=useState(null); const [q,setQ]=useState(''); const {notify}=useToast()
 const load=async()=>setUsers(await api.getUsers()); useEffect(()=>{load()},[])
 const save=async()=>{try{await api.saveUser(edit);notify('User saved','success');setEdit(null);load()}catch(e){notify(e.message,'error')}}
 const remove=async()=>{try{await api.deleteUser(del.id);notify('User deleted','success');setDel(null);load()}catch(e){notify(e.message,'error')}}
 const list=users.filter(u=>JSON.stringify(u).toLowerCase().includes(q.toLowerCase()))
 return <><PageHeader eyebrow="Admin control" title="User Management" description="Complete user CRUD for students, admins and drivers." actions={<button className="btn btn-primary" onClick={()=>setEdit({...empty})}><Icon name="plus" size={17}/> Add User</button>}/>
 <div className="surface card"><input className="input" placeholder="Search users..." value={q} onChange={e=>setQ(e.target.value)}/></div>
 {list.length?<div className="table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>University ID</th><th>Action</th></tr></thead><tbody>{list.map(u=><tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td><StatusBadge value={u.role}/></td><td>{u.universityId||'-'}</td><td><button className="btn btn-ghost" onClick={()=>setEdit({...u})}><Icon name="edit" size={16}/></button><button className="btn btn-danger" onClick={()=>setDel(u)}><Icon name="trash" size={16}/></button></td></tr>)}</tbody></table></div>:<EmptyState title="No users" text="Create a user record."/>}
 <Modal open={!!edit} onClose={()=>setEdit(null)} title="User CRUD" footer={<><button className="btn btn-ghost" onClick={()=>setEdit(null)}>Cancel</button><button className="btn btn-primary" onClick={save}>Save</button></>}>
 {edit&&<div className="stack"><input className="input" placeholder="Name" value={edit.name} onChange={e=>setEdit({...edit,name:e.target.value})}/><input className="input" placeholder="Email" value={edit.email} onChange={e=>setEdit({...edit,email:e.target.value})}/><select className="select" value={edit.role} onChange={e=>setEdit({...edit,role:e.target.value})}><option>STUDENT</option><option>ADMIN</option><option>DRIVER</option></select><input className="input" placeholder="University ID" value={edit.universityId||''} onChange={e=>setEdit({...edit,universityId:e.target.value})}/></div>}
 </Modal><Modal open={!!del} onClose={()=>setDel(null)} title="Delete user?" footer={<><button className="btn btn-ghost" onClick={()=>setDel(null)}>Cancel</button><button className="btn btn-danger" onClick={remove}>Delete</button></>}><p>All related access will be removed.</p></Modal></>
}
