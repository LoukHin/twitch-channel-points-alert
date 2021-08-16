import Link from 'next/link'
import { Disclosure, Transition } from '@headlessui/react'
import { kebabCase } from 'lib/utils'
import React from 'react'

type menuItem = {
    name: string
    icon?: React.ReactElement
}

type regularMenuItem = menuItem & {
    expandable?: false
    href: string
}

type expandableMenuItem = menuItem & {
    expandable: true
    items: Array<regularMenuItem>
}

interface SidebarProps {
    className?: string
    menuItems: Array<regularMenuItem | expandableMenuItem>
}

interface ItemProps {
    item: regularMenuItem
}

const SidebarItem: React.FC<ItemProps> = ({ item }) => {
    return (
        <Link href={item.href}>
            <a className='flex flex-row items-center h-10 px-3 rounded-lg text-gray-700 duration-200 hover:bg-gray-200'>
                <span className='flex items-center justify-center text-lg text-gray-400'>
                    {item.icon}
                </span>
                <span className='ml-3'>{item.name}</span>
            </a>
        </Link>
    )
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    return (
        <aside className={`sidebar w-64 flex-shrink-0 min-h-full-nav shadow ${props.className}`}>
            <div className='sidebar-content px-4 py-6'>
                <ul className='flex flex-col w-full'>
                    {props.menuItems.map((item, index) => {
                        if (item.expandable)
                            return (
                                <Disclosure
                                    as='li'
                                    className='my-1'
                                    key={`${kebabCase(item.name)}-${index}`}
                                >
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button
                                                className={`flex flex-row w-full items-center h-10 mr-0 px-3 duration-200 ${
                                                    open ? 'rounded-t-lg bg-gray-100' : 'rounded-lg'
                                                } text-gray-700 hover:bg-gray-200`}
                                            >
                                                <span className='flex items-center justify-center text-lg text-gray-400'>
                                                    {item.icon}
                                                </span>
                                                <span className='ml-3'>{item.name}</span>
                                            </Disclosure.Button>

                                            <Transition
                                                enter='transition duration-200 ease-out'
                                                enterFrom='transform scale-95 opacity-0'
                                                enterTo='transform scale-100 opacity-100'
                                                leave='transition duration-150 ease-out'
                                                leaveFrom='transform scale-100 opacity-100'
                                                leaveTo='transform scale-95 opacity-0'
                                            >
                                                <Disclosure.Panel className='bg-gray-50 p-2 pl-5 rounded-b-lg'>
                                                    {Object.values(item.items).map(
                                                        (subItem, subIndex) => (
                                                            <SidebarItem
                                                                item={subItem}
                                                                key={`${kebabCase(
                                                                    subItem.name
                                                                )}-${subIndex}`}
                                                            />
                                                        )
                                                    )}
                                                </Disclosure.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Disclosure>
                            )
                        return (
                            <li className='my-1' key={`${kebabCase(item.name)}-${index}`}>
                                <SidebarItem item={item} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar
