import { useState } from 'react';
import { Card, Icon, SectionTitle } from '../components/UI';

export default function Settings() {
  const [dark, setDark] = useState(false);
  const [email, setEmail] = useState(true);
  const [push, setPush] = useState(false);
  const [saved, setSaved] = useState(false);

  const settingsSections = [
    'Account Settings',
    'Appearance',
    'Notifications',
    'AI Preferences',
    'Connected Accounts',
    'Privacy & Data',
  ];

  return (
    <div className={dark ? 'settings-dark' : ''}>
      <div className="page-head">
        <div>
          <h1>Settings</h1>
          <p>Manage your account preferences and AI configurations.</p>
        </div>
      </div>

      <div className="settings-grid">
        <aside className="settings-nav">
          {settingsSections.map((section) => {
            const anchor = section.toLowerCase().replace(/ /g, '-');

            return (
              <a href={`#${anchor}`} key={section}>
                {section}
                <Icon>chevron_right</Icon>
              </a>
            );
          })}
        </aside>

        <div className="stack">
          <Card id="account-settings">
            <SectionTitle title="Account Settings" />

            <div className="form-grid">
              <label>
                Full Name
                <input defaultValue="Nissi Grace" />
              </label>

              <label>
                Email Address
                <input defaultValue="nissi@example.com" />
              </label>

              <label>
                College
                <input defaultValue="Tech Institute" />
              </label>

              <label>
                Target Role
                <input defaultValue="Software Engineer" />
              </label>
            </div>

            <div className="actions">
              <button
                className="btn primary"
                onClick={() => setSaved(true)}
              >
                {saved ? 'Saved ✓' : 'Save Changes'}
              </button>
            </div>
          </Card>

          <Card id="appearance">
            <SectionTitle title="Appearance" />

            <div className="setting-row">
              <div>
                <b>Theme</b>
                <p>Customize the interface color scheme.</p>
              </div>

              <div className="segmented">
                {['Light', 'Dark', 'System'].map((theme) => (
                  <button
                    key={theme}
                    className={
                      (theme === 'Dark' && dark) ||
                      (theme === 'Light' && !dark)
                        ? 'selected'
                        : ''
                    }
                    onClick={() => {
                      if (theme !== 'System') {
                        setDark(theme === 'Dark');
                      }
                    }}
                  >
                    <Icon>
                      {theme === 'Dark'
                        ? 'dark_mode'
                        : theme === 'Light'
                          ? 'light_mode'
                          : 'settings_brightness'}
                    </Icon>
                    {theme}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <Card id="notifications">
            <SectionTitle title="Notifications" />

            <Toggle
              label="Email Notifications"
              desc="Receive weekly recaps and interview reminders."
              value={email}
              set={setEmail}
            />

            <Toggle
              label="Push Notifications"
              desc="Instant AI coaching and task completion alerts."
              value={push}
              set={setPush}
            />
          </Card>

          <Card id="ai-preferences">
            <SectionTitle title="AI Preferences" />

            <Toggle
              label="Personalized coaching"
              desc="Use your skill gaps and activity to tailor recommendations."
              value={true}
              set={() => {}}
            />

            <Toggle
              label="Interview feedback"
              desc="Give concise feedback after every mock answer."
              value={true}
              set={() => {}}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

function Toggle({
  label,
  desc,
  value,
  set,
}: {
  label: string;
  desc: string;
  value: boolean;
  set: (value: boolean) => void;
}) {
  return (
    <div className="setting-row">
      <div>
        <b>{label}</b>
        <p>{desc}</p>
      </div>

      <button
        type="button"
        className={`toggle ${value ? 'on' : ''}`}
        onClick={() => set(!value)}
        aria-pressed={value}
        aria-label={label}
      >
        <span />
      </button>
    </div>
  );
}
