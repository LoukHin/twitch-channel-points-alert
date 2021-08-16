import React from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'

import { kebabCase } from 'lib/utils'

type menuItem = {
    name: string
    icon?: React.ReactElement
    onClick: Function
}

interface Props {
    buttonChildren?: React.ReactElement
    menuItems: Array<menuItem>
}

const Dropdown: React.FC<Props> = (props) => {
    return (
        <Menu as='div' className='relative inline-block text-left'>
            {({ open }) => (
                <>
                    <Menu.Button
                        className={`${
                            open && 'bg-opacity-20 hover:bg-opacity-30'
                        } flex justify-center items-center w-full px-2 py-1 duration-150 text-sm font-medium text-white bg-black rounded-lg bg-opacity-10 hover:bg-opacity-20 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                        {props.buttonChildren}
                        <ChevronDownIcon
                            className={`${open && 'rotate-180'} h-5 w-5 ml-2 transform duration-150`}
                        />
                    </Menu.Button>
                    <Transition
                        as={React.Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                    >
                        <Menu.Items className='absolute right-0 w-44 mt-1 origin-top-right bg-white divide-y rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            <div className='p-1'>
                                {Object.values(props.menuItems).map((item, index) => (
                                    <Menu.Item key={`${kebabCase(item.name)}-${index}`}>
                                        {({ active }) => (
                                            <button
                                                className={`${
                                                    active && 'bg-gray-200'
                                                }  duration-150 group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900`}
                                                onClick={() => item.onClick()}
                                            >
                                                {item.icon && (
                                                    <span className='mr-2'>{item.icon}</span>
                                                )}
                                                {item.name}
                                            </button>
                                        )}
                                    </Menu.Item>
                                ))}
                            </div>
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    )
}

export default Dropdown
