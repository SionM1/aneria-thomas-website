import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="group flex items-center justify-between">
          <div className="mr-3 transition-transform duration-300 ease-in-out group-hover:scale-110">
            <Logo />
          </div>
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="group-hover:text-primary-500 hidden h-6 text-2xl font-semibold transition-colors duration-300 ease-in-out sm:block">
              Aneira Thomas
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <div className="hidden sm:block">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hover:text-primary-500 dark:hover:text-primary-400 group relative p-1 font-medium text-gray-900 transition-all duration-300 ease-in-out sm:p-4 dark:text-gray-100"
              >
                <span className="relative z-10">{link.title}</span>
                {/* Underline animation */}
                <span className="bg-primary-500 absolute bottom-0 left-1/2 h-0.5 w-0 transition-all duration-300 ease-in-out group-hover:left-0 group-hover:w-full"></span>
                {/* Background hover effect */}
                <span className="bg-primary-50 dark:bg-primary-900/20 absolute inset-0 rounded-md opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></span>
              </Link>
            ))}
        </div>
        <div className="transition-transform duration-300 ease-in-out hover:scale-110">
          <SearchButton />
        </div>
        <div className="transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-12">
          <ThemeSwitch />
        </div>
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
