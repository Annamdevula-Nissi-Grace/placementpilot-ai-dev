import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { nav } from '../data/data';
import { Icon } from './UI';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    user,
    profile,
    logout,
  } = useAuth();

  const displayName =
    profile?.full_name?.trim() ||
    user?.email?.split('@')[0] ||
    'Student';

  const initial =
    displayName.charAt(0).toUpperCase();

  function handleLogout() {
    logout();
    navigate('/login', {
      replace: true,
    });
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
            <Icon fill>
              auto_awesome
            </Icon>
          </div>

          <div>
            <b>CareerAI</b>
            <small>Elite Prep</small>
          </div>
        </div>

        <nav>
          {nav.map(
            ([icon, label, path]) => (
              <NavLink
                key={path}
                to={path}
                className={({
                  isActive,
                }) =>
                  isActive
                    ? 'active'
                    : ''
                }
              >
                <Icon
                  fill={
                    location.pathname ===
                    path
                  }
                >
                  {icon}
                </Icon>

                <span>
                  {label}
                </span>
              </NavLink>
            )
          )}
        </nav>

        <div className="user-mini">
          <div className="avatar">
            {initial}
          </div>

          <div className="user-mini-info">
            <b>
              {displayName}
            </b>

            <small>
              {user?.email ||
                'Signed in'}
            </small>
          </div>

          <button
            className="logout-icon"
            type="button"
            onClick={handleLogout}
            title="Sign out"
            aria-label="Sign out"
          >
            <Icon>
              logout
            </Icon>
          </button>
        </div>
      </aside>

      <header className="topbar">
        <button
          className="mobile-menu"
          onClick={() =>
            navigate('/')
          }
        >
          <Icon>
            menu
          </Icon>
        </button>

        <div className="mobile-brand">
          CareerAI
        </div>

        <div className="search">
          <Icon>
            search
          </Icon>

          <input
            placeholder="Search..."
          />
        </div>

        <div className="top-actions">
          <button>
            <Icon>
              notifications
            </Icon>
          </button>

          <button>
            <Icon>
              help
            </Icon>
          </button>

          <button
            className="avatar"
            title={displayName}
            onClick={() =>
              navigate('/profile')
            }
          >
            {initial}
          </button>

          <button
            className="btn"
            type="button"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="content">
        <Outlet />
      </main>

      <nav className="bottom-nav">
        {[
          [
            'home',
            'Home',
            '/',
          ],
          [
            'school',
            'Prep',
            '/roadmap',
          ],
          [
            'smart_toy',
            'Coach',
            '/coach',
          ],
          [
            'work',
            'Jobs',
            '/jobs',
          ],
          [
            'menu',
            'More',
            '/settings',
          ],
        ].map(
          ([icon, label, path]) => (
            <NavLink
              key={path}
              to={path}
            >
              <Icon>
                {icon}
              </Icon>

              <span>
                {label}
              </span>
            </NavLink>
          )
        )}
      </nav>
    </div>
  );
}