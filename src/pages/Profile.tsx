import {
  Card,
  Icon,
  SectionTitle,
} from '../components/UI';

import { useAuth } from '../context/AuthContext';

function displayValue(
  value: string | null | undefined,
  fallback = 'Not added yet'
) {
  if (!value?.trim()) {
    return fallback;
  }

  return value;
}

function formatGraduationDate(
  value: string | null | undefined
) {
  if (!value) {
    return 'Not added yet';
  }

  const date = new Date(value);

  if (
    Number.isNaN(date.getTime())
  ) {
    return value;
  }

  return date.toLocaleDateString(
    undefined,
    {
      month: 'long',
      year: 'numeric',
    }
  );
}

export default function Profile() {
  const {
    user,
    profile,
  } = useAuth();

  const fullName =
    displayValue(
      profile?.full_name,
      'Student'
    );

  const email =
    profile?.email ||
    user?.email ||
    'Email not available';

  const initial =
    fullName
      .charAt(0)
      .toUpperCase();

  const completion =
    profile?.profile_completion ??
    0;

  const targetRole =
    displayValue(
      profile?.target_role
    );

  const college =
    displayValue(
      profile?.college
    );

  const location =
    displayValue(
      profile?.location
    );

  const graduation =
    formatGraduationDate(
      profile?.graduation_date
    );

  const careerSummary =
    displayValue(
      profile?.career_summary,
      'Add your career summary to make your profile stronger.'
    );

  return (
    <>
      <div className="page-head">
        <div>
          <h1>
            Student Profile
          </h1>

          <p>
            Your authenticated
            PlacementPilot profile
          </p>
        </div>

        <div className="actions">
          <button
            className="btn"
            disabled
            title="Profile editing will be enabled in the next feature."
          >
            <Icon>
              edit
            </Icon>

            Edit Profile
          </button>

          <button
            className="btn primary"
          >
            <Icon>
              upload_file
            </Icon>

            Upload Resume
          </button>
        </div>
      </div>

      <div className="profile-grid">
        <div className="stack">
          <Card className="profile-card">
            <div className="profile-cover" />

            <div className="profile-main">
              <div className="big-avatar">
                {initial}
              </div>

              <h2>
                {fullName}
              </h2>

              <p>
                {email}
              </p>

              <div className="details">
                <span>
                  <Icon>
                    school
                  </Icon>

                  College

                  <b>
                    {college}
                  </b>
                </span>

                <span>
                  <Icon>
                    calendar_month
                  </Icon>

                  Graduation

                  <b>
                    {graduation}
                  </b>
                </span>

                <span>
                  <Icon>
                    location_on
                  </Icon>

                  Location

                  <b>
                    {location}
                  </b>
                </span>
              </div>
            </div>
          </Card>

          <Card>
            <SectionTitle
              title="Profile Completeness"
            />

            <div className="ring">
              <span>
                {completion}%
              </span>
            </div>

            <p className="muted center">
              Complete your profile
              details to improve your
              placement recommendations.
            </p>

            <button
              className="btn full"
              disabled
            >
              Complete Profile
            </button>
          </Card>
        </div>

        <div className="stack">
          <Card>
            <SectionTitle
              title="Career Summary"
            />

            <p>
              {careerSummary}
            </p>
          </Card>

          <Card>
            <SectionTitle
              title="Target Role"
            />

            <div className="role">
              <Icon>
                developer_mode
              </Icon>

              {targetRole}
            </div>
          </Card>

          <Card>
            <SectionTitle
              title="Account Information"
            />

            <div className="details">
              <span>
                <Icon>
                  person
                </Icon>

                Name

                <b>
                  {fullName}
                </b>
              </span>

              <span>
                <Icon>
                  mail
                </Icon>

                Email

                <b>
                  {email}
                </b>
              </span>

              <span>
                <Icon>
                  verified_user
                </Icon>

                Account

                <b>
                  Authenticated
                </b>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}