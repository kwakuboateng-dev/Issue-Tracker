'use client';

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AiOutlineIssuesClose } from "react-icons/ai"
import classnames from "classnames"

const Navbar = () => {
  // Get the current pathname
  const currentPath = usePathname()

  const links = [
    { href: '/', label: 'Dashboard' },
    { href: '/issues', label: 'Issues' },
  ]

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/"><AiOutlineIssuesClose /></Link>
      <ul className="flex space-x-6">
        {links.map(link =>
          <Link
            key={link.href}
            // className={`${link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-800 transition-colors`}
            className={classnames({
              'text-zinc-900': link.href === currentPath,
              'text-zinc-500': link.href !== currentPath,
              'hover:text-zinc-800 transition-colors': true

            })}
            href={link.href}>{link.label}</Link>)}
      </ul>
    </nav>
  )
}

export default Navbar