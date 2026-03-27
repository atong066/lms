import { useState } from 'react'
import StudentShell from './StudentShell'

const tabs = ['General', 'Profile', 'Notifications', 'Security'] as const

export default function StudentSettings() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('General')

  return (
    <StudentShell activePath="/student/settings" title="Settings" subtitle="Manage your student account preferences, notifications, and sign-in settings.">
      <section className="student-portal__panel student-settings__panel">
        <div className="student-settings__tabs" role="tablist" aria-label="Student settings tabs">
          {tabs.map((tab) => (
            <button key={tab} type="button" className={activeTab === tab ? 'is-active' : undefined} onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'General' ? (
          <div className="student-settings__content">
            <label><span>Display name</span><input defaultValue="Ava Ramos" /></label>
            <label><span>Preferred section label</span><input defaultValue="BSIS 3A" /></label>
            <label><span>Language</span><select defaultValue="English"><option>English</option><option>Filipino</option></select></label>
            <label><span>Timezone</span><select defaultValue="Asia/Singapore"><option>Asia/Singapore</option></select></label>
          </div>
        ) : null}

        {activeTab === 'Profile' ? (
          <div className="student-settings__content">
            <label><span>Mobile number</span><input defaultValue="+63 917 880 1041" /></label>
            <label><span>Address</span><input defaultValue="San Fernando, Pampanga, Philippines" /></label>
            <label><span>Guardian name</span><input defaultValue="Marissa Ramos" /></label>
            <label><span>Guardian phone</span><input defaultValue="+63 917 550 2280" /></label>
          </div>
        ) : null}

        {activeTab === 'Notifications' ? (
          <div className="student-settings__toggles">
            <article><div><strong>Assessment reminders</strong><span>Get notified before open quizzes and exams.</span></div><button className="is-on"><span /></button></article>
            <article><div><strong>Grade release updates</strong><span>Know when a teacher posts new quarter standing.</span></div><button className="is-on"><span /></button></article>
            <article><div><strong>Forum mentions</strong><span>Receive alerts when you are tagged in a thread.</span></div><button><span /></button></article>
          </div>
        ) : null}

        {activeTab === 'Security' ? (
          <div className="student-settings__content">
            <label><span>Current password</span><input type="password" defaultValue="password123" /></label>
            <label><span>New password</span><input type="password" defaultValue="password123" /></label>
            <label><span>Confirm password</span><input type="password" defaultValue="password123" /></label>
            <label><span>Session timeout</span><select defaultValue="30 minutes"><option>30 minutes</option><option>1 hour</option></select></label>
          </div>
        ) : null}

        <div className="student-settings__footer">
          <button type="button" className="student-assessments__link is-secondary">Cancel</button>
          <button type="button" className="student-assessments__link">Save changes</button>
        </div>
      </section>
    </StudentShell>
  )
}
