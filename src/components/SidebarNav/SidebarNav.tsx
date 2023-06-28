import clsx from 'clsx';
import { Sidebar } from 'flowbite-react';
import { useState } from 'react';
import { FaHouse, FaRocket } from 'react-icons/fa6';

export default function SidebarNav() {
  const [isOpen, setIsOpen] = useState(false);

  function openDrawer() {
    setIsOpen(!isOpen);
  }

  const hamburgerMenuButton = (
    <button
      data-drawer-target="drawer-navigation"
      data-drawer-show="drawer-navigation"
      aria-controls="drawer-navigation"
      type="button"
      className={clsx(
        'absolute ml-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500',
        'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200',
        'dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
      )}
      onClick={openDrawer}
    >
      <span className="sr-only">Open sidebar</span>
      <svg
        className="h-6 w-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        z-index="auto"
      >
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        ></path>
      </svg>
    </button>
  );

  const closeSidebarButton = (
    <button
      type="button"
      data-drawer-hide="drawer-navigation"
      aria-controls="drawer-navigation"
      className={clsx(
        'absolute right-2.5 top-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400',
        'hover:bg-gray-200 hover:text-gray-900',
        'dark:hover:bg-gray-600 dark:hover:text-white'
      )}
      onClick={openDrawer}
    >
      <svg
        aria-hidden="true"
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="sr-only">Close menu</span>
    </button>
  );

  return (
    <>
      {hamburgerMenuButton}
      <Sidebar
        id="drawer-navigation"
        className={`fixed left-0 top-0 z-40 h-screen w-64 overflow-y-auto p-4 transition-transform ${
          isOpen ? '-translate-x-0' : '-translate-x-full'
        } bg-white dark:bg-gray-800`}
        z-index="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <div className="h-full overflow-y-auto bg-white px-3 py-5 dark:border-gray-700 dark:bg-gray-800">
          {closeSidebarButton}
          {/* <h5
            id="drawer-navigation-label"
            className="text-base font-semibold uppercase text-gray-500 dark:text-gray-400"
          >
            Menu
          </h5> */}
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="/" icon={FaHouse}>
                Home
              </Sidebar.Item>
              <Sidebar.Item href="/fleet" icon={FaRocket}>
                Fleet
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </Sidebar>
    </>
  );
}
