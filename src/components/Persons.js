import {useState} from "react";
import Select from 'react-select'



function Persons() {

    const [persons,setPersons]=useState([
        {value:1,label:'ali'},
        {value:2,label:'reza'},
        {value:3,label:'hamid'},
        {value:4,label:'roya'},
        {value:5,label:'sara'},
        {value:6,label:'goli'},
        {value:7,label:'nagi'},
        {value:8,label:'saeed'},
    ])
    const [absentList,setAbsentList]=useState([])
    const [presentList,setPresentList]=useState([])

    function addP(item) {
        if(!presentList.some(p => p.value === item.value)){
            setPresentList(presentList=>[...presentList,item])
        }
    }
    function addA(item) {
        if(!absentList.some(p => p.value === item.value)){
            setAbsentList(absentList=>[...absentList,item])
            setPersons(persons.filter((i)=>i.value !== item?.value))
            setPresentList(presentList.filter((i)=>i.value !== item?.value))
        }
    }


    return (
        <div className='preson-part'>
            <section>
                <h2>لیست حاضرین:</h2>
                <Select options={persons} onChange={e=> addP(e)}/>
                {presentList?.length?presentList.map(p=>(
                    <div key={p.value}>
                        {p?.label}
                        <button type='button' onClick={()=>setPresentList(presentList.filter((i)=>i.value !== p?.value))}>x</button>
                    </div>
                )):''}
            </section>
            <section>
                <h2>لیست غایبین:</h2>
                <Select options={persons} onChange={e=>addA(e)} />
                {absentList?.length?absentList.map(p=>(
                    <div key={p.value}>
                        {p?.label}
                        <button type='button' onClick={()=> {
                            setAbsentList(absentList.filter((i) => i.value !== p?.value))
                            setPersons(persons=>[...persons,p])
                        }}>x</button>
                    </div>
                )):''}
            </section>
        </div>

    );
}

export default Persons;
