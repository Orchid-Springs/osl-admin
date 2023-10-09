import React, { useEffect, useState } from 'react';
import { Input, Table } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';


const Contacts = () => {
  const [searchText, setSearchText] = useState('');
  const [contacts, setContacts] = useState([]); 

  useEffect(()=> {
    const fetchData = async() => {
        const { data } = await axios.get(`https://orchidsprings.cyclic.cloud/api/contact`);
        setContacts(data)
    }
    fetchData()
  }, [])


  const columns = [
    {
      title: "#",
      dataIndex: '_id',
      key: '_id',
      render: (__, _, i) => i + 1
    },
    {
      title: 'Full Name',
      dataIndex: 'fullname',
      key: '_id',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return record?.fullname.toString().toLowerCase().includes(value.toLowerCase()) ||
        record?.email.toString().toLowerCase().includes(value.toLowerCase())
      }, 
    
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: '_id',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phonenumber',
      key: '_id',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: '_id',
    },
    {
      title: 'Messages',
      dataIndex: 'message',
      key: '_id',
      render: (msgs) => msgs?.map((msg,i) => <><p key={i} className='font-bold'>{msg}</p></>)
    },
    {
      title: 'Date',
      dataIndex: 'updatedAt',
      key: '_id',
      render: (date) => dayjs(date).format('DD/MM/YYYY')
    },
    {
      title: '',
      dataIndex: 'email',
      key: '_id',
      render: (email) => `<a href="mailto:${email}"> Reply </a>`
    },
  ];
  return (
        <div className='bg-white p-5'>
            <div className='w-[80%] p-3'>
             <Input.Search 
                placeholder='Search here...'
                onSearch={(value) => {
                    setSearchText(value)
                }}
                onChange={(e) => {
                    setSearchText(e.target.value)
                }}
            />
            </div>
            <Table 
              tableLayout='auto' 
              bordered 
              columns={columns} 
              dataSource={contacts}
              pagination={{
                position: ['topRight'],
              }}  
            />
        </div>
    );
};
export default Contacts;