import { useState } from "react"
import { type TabProps, Tabs } from "antd-mobile"

export const TradeTabs: React.FC = () => {
    const [tabs] = useState<Array<TabProps & { name: string }>>([
        { title: 'Current Order', name: 'currentOrder' },
        { title: 'My Positions', name: 'myPos' },
    ])

    return (
        <Tabs defaultActiveKey={tabs[0].name}>
            {tabs.map(({ name, children, ...tabProps }) => (<Tabs.Tab {...tabProps} key={name}>
                {children ? <>{children}</> : <>{name}</>}
            </Tabs.Tab>))}
        </Tabs>
    )
}

export default TradeTabs
