import { useState } from 'react'
import { Form, Input, Button, AutoCenter } from 'antd-mobile'
import { AddCircleOutline, DownOutline, CloseCircleOutline, AddSquareOutline } from 'antd-mobile-icons'
import {v4 as uuidv4} from 'uuid'
import styles from './index.less'
export default function () {
    const [list, setList] = useState([{
        id: uuidv4(),
        childList: [{
            id: uuidv4()
        }]
    }])
    const [form] = Form.useForm()
    const addItem = () => {
        const id = uuidv4()
        const arr = [...list, { id, childList: [] }]
        setList(arr)
    }
    const deleteItem = (index) => {
        const arr = [...list]
        arr.splice(index, 1)
        console.log(arr)
        setList(arr)
    }
    const addItem2 = (index) => {
        console.log(index)
        const id = uuidv4()
        const arr = [...list]
        console.log(arr)
        const item = arr[index].childList
        item.push({ id })
        arr[index].childList = item
        setList(arr)
    }
    const deleteItem2 = (index, childIndex) => {
        const arr = [...list]
        const item = arr[index].childList
        item.splice(childIndex, 1)
        arr.splice(index, 1, { ...arr[index], childList: item })
        setList(arr)
    }
    return <div className={styles.formPage + ' custom-form'}>
        <div className={styles.formPageWrapper}>
            <Form
                form={form}
                onFinish={val => console.log(val)}
                initialValues={
                    {
                        name: '默认内容',
                        list: [
                            {
                                email: '',
                                phone: '',
                                chirdList: [
                                    {
                                        lnglat: ''
                                    }
                                ]
                            }
                        ]
                    }
                }
                footer={<Button block type='submit' color='primary' size='large'>提交</Button>}
            >
                <div className={styles.areaHeader}>
                    <span style={{ marginRight: '5px' }}>公共字段</span>
                </div>
                <div className={styles.area}>

                    <Form.Item
                        name="name"
                        label="字段一">
                        <Input placeholder='请输入' />
                    </Form.Item>
                    <Form.Item
                        name="name2"
                        label="字段二">
                        <Input placeholder='请输入' />
                    </Form.Item>
                </div>
                <div className={styles.areaHeader}>
                    <span style={{ marginRight: '5px' }}>集合字段</span>
                    <AddSquareOutline onClick={addItem} style={{ cursor: 'pointer' }} />
                </div>
                {
                    list &&
                    list.map((item, index) => {
                        return <div className={styles.formItem} key={item.id}>
                            <div className={styles.groupDelete}>
                                <div>集合{index + 1}</div>
                                <div style={{ cursor: 'pointer' }} onClick={() => deleteItem(index)}>删除</div>
                            </div>
                            <Form.Item
                                name={['list', index, 'email']}
                                label="邮箱">
                                <Input placeholder='请输入' />
                            </Form.Item>
                            <Form.Item
                                name={['list', index, 'phone']}
                                label="手机号">
                                <Input placeholder='请输入' />
                            </Form.Item>
                            <div className={styles.lnglat}>
                                {
                                    item.childList &&
                                    item.childList.map((childItem, childIndex) => {
                                        return <div className={styles.formItem} key={childItem.id}>
                                            <div className={styles.itemDelete}>
                                                <CloseCircleOutline style={{ cursor: 'pointer' }} onClick={() => deleteItem2(index, childIndex)} />
                                            </div>
                                            <Form.Item
                                                name={['list', index, 'childList', index, 'lnglat']}
                                                label={`经纬度${index + 1}`}>
                                                <Input placeholder='请输入' />
                                            </Form.Item>
                                        </div>
                                    })
                                }
                                <AutoCenter>
                                    <Button size='small' color='primary' block shape='rounded' onClick={() => addItem2(index)}>
                                        <AddSquareOutline style={{ cursor: 'pointer' }} />
                                        添加经纬度
                                    </Button>
                                </AutoCenter>
                            </div>
                            <Form.Item
                                name={['list', index, 'addr']}
                                label="地址">
                                <Input placeholder='请输入' />
                            </Form.Item>

                        </div>
                    })
                }
            </Form>
        </div>
    </div >
}