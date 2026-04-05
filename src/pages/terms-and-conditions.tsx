import { Navigation } from "../components/Navigation";
import resqLinkLogo from '../assets/logos/resqlink-android-icon-adaptive.png';
import { useEffect } from "react";
import { updateSEO, DEFAULT_SEO } from "../utils/seo";

export default function TermsAndConditions() {
  useEffect(() => {
    // Update SEO for Terms & Conditions page
    updateSEO(DEFAULT_SEO.termsAndConditions);
  }, []);
  return (
    <div className="w-screen overflow-hidden bg-gradient-to-br from-[#0b0b0a] via-[#111110] to-[#060605] text-[#fefdf5]">
      <Navigation />

      <main className="bg-black w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        <div className="max-w-4xl mx-auto bg-gradient-to-tr from-[#0f0f0e]/60 to-[#171716]/60 border border-[#e0eaff]/12 rounded-2xl p-10 backdrop-blur-sm">
          <header className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={resqLinkLogo}
                alt="ResQLink"
                className="h-10 w-10"
              />
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Waitlist & Beta Tester Terms and Conditions
                </h1>
                <div className="flex items-center gap-2 mt-1 text-sm text-[#e0eaff]/70">
                  <span>Last updated:</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-sm bg-[#e0eaff]/10 text-[#e0eaff]">
                    April 6, 2026
                  </span>
                </div>
              </div>
            </div>
          </header>

          <article className="prose prose-invert max-w-none text-base leading-relaxed">
            <p>
              By submitting your email address to join the waitlist for this
              application ("the App"), you agree to be bound by the following
              Terms and Conditions ("Terms"). If you do not agree to these
              Terms, do not submit your email address.
            </p>

            <h2>1. Scope of Agreement</h2>
            <p>
              These Terms govern your participation in the pre-launch waitlist
              and any subsequent beta testing phases of the App. Your
              participation is voluntary. Joining the waitlist does not
              guarantee access to the beta test or the final version of the App.
            </p>

            <h2>2. Data Collection and Use</h2>
            <p>
              <strong>2.1 Information Collected:</strong> The only personal
              information we will collect from you for the purpose of the
              waitlist is your email address.
            </p>
            <p>
              <strong>2.2 Purpose of Use:</strong> By providing your email
              address, you grant us explicit consent to use it for the following
              purposes only:
            </p>
            <ul>
              <li>
                To notify you when the App is available for general testing or
                public release.
              </li>
              <li>To invite you to participate in beta testing programs.</li>
              <li>
                To send you forms, surveys, and other communications directly
                related to your participation as a beta tester.
              </li>
            </ul>

            <h2>3. Beta Tester Obligations</h2>
            <p>
              Should you be selected and agree to participate in a beta testing
              program for the App, you are required to:
            </p>
            <ul>
              <li>
                <strong>3.1 Provide Feedback:</strong> Actively participate by
                completing and submitting surveys, forms, or other feedback
                requests related to the App's functionality, design, and
                performance.
              </li>
              <li>
                <strong>3.2 Confidentiality:</strong> Treat all information
                related to the App as strictly confidential. This includes, but
                is not limited to, features, design, user interface, business
                logic, marketing plans, and any other non-public information.
                You agree not to disclose, share, screenshot, record, or
                otherwise divulge this confidential information to any third
                party, including other potential users, competitors, or the
                public. Violation of this clause will result in immediate
                termination of your access and may lead to legal action.
              </li>
            </ul>

            <h2>4. Disclaimer of Warranties</h2>
            <p>
              The App, when provided for beta testing, will be on an "as is" and
              "as available" basis. We make no warranties, express or implied,
              regarding its functionality, reliability, or suitability for any
              particular purpose. You acknowledge that pre-release software may
              contain bugs, errors, and other problems.
            </p>

            <h2>5. Termination</h2>
            <p>
              We reserve the right to remove you from the waitlist or terminate
              your access to the beta program at any time, for any reason,
              without notice. You may request the removal of your email address
              from our lists by contacting us at jvillarosa.a12240987@umak.edu.ph.
            </p>

            <h2>6. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of the Republic of the Philippines.
            </p>

            <hr className="my-6 border-[#e0eaff]/8" />

            <p className="text-sm text-[#e0eaff]/60">
              If you have questions about these Terms, please contact us at
              jvillarosa.a12240987@umak.edu.ph.
            </p>
          </article>
        </div>
      </main>
    </div>
  );
}
