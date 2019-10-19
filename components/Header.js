import Link from 'next/link'
import { withRouter } from 'next/router'

const Header = ({ router: { pathname } }) => {
  return (
    <header>
      <div>
        <Link href='/'>
          <a className={pathname === '/' ? 'is-active' : ''}>Dashboard</a>
        </Link>
      </div>
      <style jsx>{`
        header {
          margin-bottom: 25px;
          display: flex;
          justify-content: space-between;
        }
        a {
          font-size: 14px;
          margin-right: 15px;
          text-decoration: none;
        }
        .is-active {
          text-decoration: underline;
        }
      `}</style>
    </header>
  )
}

export default withRouter(Header)
