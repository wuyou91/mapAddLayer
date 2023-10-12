import { useState } from 'react'
import { Form, Input, Button } from 'antd-mobile'
import { AddCircleOutline, DownOutline } from 'antd-mobile-icons'
import styles from './index.less'
export default function () {
    const [activeKey, setActiveKey] = useState([0])
    const [form] = Form.useForm()

    return <div className={styles.formPage}>
        <div className={styles.header}>表单</div>
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
            <Form.Array
                name='list'
                onAdd={operation => {
                    operation.add({
                        email: '',
                        phone: '',
                        chirdList: [
                            {
                                lnglat: ''
                            }
                        ]
                    })
                }}
                renderAdd={() => (
                    <span>
                        <AddCircleOutline /> 添加
                    </span>
                )}
                renderHeader={({ index, key }, { remove }) => {
                    const arr = activeKey
                    arr.splice(index, 1)
                    setActiveKey(arr)
                    return <>
                        <span>集合{index + 1}</span>
                        <a onClick={() => remove(index)} style={{ float: 'right' }}>
                            删除
                        </a>
                    </>
                }}
            >
                {fields =>
                    fields.map(({ index, key }) => (
                        <div className={styles.arrWrapper}>
                            <div className={styles.arrHeader} onClick={() => console.log(index, key)}>
                                <DownOutline />
                            </div>
                            <div className={styles.arrContent}>
                                <Form.Item
                                    name={[index, 'email']}
                                    label="邮箱">
                                    <Input placeholder='请输入' />
                                </Form.Item>
                                <Form.Item
                                    name={[index, 'phone']}
                                    label="手机号">
                                    <Input placeholder='请输入' />
                                </Form.Item>
                                <Form.Array
                                    name={[index, 'chirdList']}
                                    onAdd={operation => operation.add(
                                        {
                                            lnglat: ''
                                        }
                                    )}
                                    renderAdd={() => (
                                        <span>
                                            <AddCircleOutline /> 添加
                                        </span>
                                    )}
                                    renderHeader={({ index }, { remove }) => (
                                        <>
                                            <span>坐标{index + 1}</span>
                                            <a onClick={() => remove(index)} style={{ float: 'right' }}>
                                                删除
                                            </a>
                                        </>
                                    )}
                                >
                                    {f =>
                                        f.map(({ index }) => {
                                            return <>
                                                <Form.Item
                                                    name={[index, 'lnglat']}
                                                    label="坐标">
                                                    <Input placeholder='请输入' />
                                                </Form.Item>
                                            </>

                                        })
                                    }
                                </Form.Array>
                            </div>
                        </div>
                    ))
                }
            </Form.Array>
        </Form>
    </div >
}