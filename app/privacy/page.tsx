import Navbar from "@/components/pages/main/Navbar"
import Footer from "@/components/pages/main/Footer"
import { Scale } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function Privacy() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-950 to-gray-900">
      <Navbar />
      <main>
        <div className="pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              {/* there may be a better way to size this dynamically */}
              <Scale className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0" />
              <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                Privacy Policy
              </h1>
            </div>
            <h3 className="text-2xl text-muted-foreground my-4">
              LibreCloud doesn&#39;t pretend to care about your data. We do.
            </h3>
            <h4 className="text-xl"><span className="font-bold">Date Effective:</span> 13 March 2025</h4>
            <Separator className="my-4" />
            <h2 className="text-3xl font-bold">I. Introduction & Who We Are</h2>
            <p className="my-2">LibreCloud (”LibreCloud”, “We”, “Us”) is operated by individual volunteers and is not a business.</p>
            <p className="my-2">Our members include:</p>
            <ul className="list-disc list-inside">
              <li className="mb-1">Aidan Honor (operator and privacy contact)</li>
              <li className="my-1">Lucas Gabriel (lucmsilva)</li>
              <li className="mt-1">Giovani Finazzi</li>
            </ul>
            <p className="my-2">We are based around the principle of freedom and privacy and make every effort possible to ensure you have complete control over your data.</p>
            <p className="my-2">For users in the EU, this policy aligns with GDPR requirements.</p>
            <p className="my-2">LibreCloud is not intended for users under 16. We do not knowingly collect data from minors.</p>
            <h2 className="text-3xl font-bold mt-8">II. Data We Collect</h2>
            <p className="my-2">LibreCloud does not collect extra data beyond what is strictly necessary to operate. Data collected only applies to registered LibreCloud users, as we do not collect data from un-authenticated users.</p>
            <p className="my-2">A user (”User”, “You”, “Your”) refers to an individual who has created an account with LibreCloud and agreed to this policy.</p>
            <p className="my-2 font-bold">We collect:</p>
            <ul className="list-disc list-inside">
              <li className="mb-1"><span className="font-bold">Account Information:</span> Name, email address.</li>
              <li className="my-1"><span className="font-bold">Services You Use (if applicable):</span> Information and data from LibreCloud services (e.g. Gitea username, Vaultwarden login history).</li>
              <li className="mt-1"><span className="font-bold">Logs:</span> Technical data (e.g. your IP address, user agent, error logs) generated from your usage of our services, used strictly for debugging and functional purposes only. No effort has been made to associate logs with a user’s account.</li>
            </ul>
            <h3 className="text-2xl font-bold mb-2 mt-3.5">Third-Party Services</h3>
            <p className="my-2">LibreCloud uses open-source tools like Gitea and Vaultwarden. These tools may collect data to function, but we do not add extra tracking. Their data practices are governed by their own documentation (e.g. Gitea Docs, Vaultwarden Docs).</p>
            <h2 className="text-3xl font-bold mt-8">III. How Your Data Is Used</h2>
            <p className="my-2">LibreCloud does not use data for any other purpose than delivering functional services to you. We do not profit from or share your data with anyone outside of LibreCloud.</p>
            <p className="my-2 font-bold">We use your data to:</p>
            <ul className="list-disc list-inside">
              <li className="mb-1"><span className="font-bold">Improve Services:</span> If a service goes down, we might use data generated by your client to diagnose an error in our code.</li>
              <li className="my-1"><span className="font-bold">Reduce Support Waiting Time:</span> We may use your account data to provide faster support to you.</li>
              <li className="my-1"><span className="font-bold">Legal Compliance:</span> We will only comply with legally valid requests for data disclosure, such as court orders or subpoenas.</li>
              <li className="mt-1"><span className="font-bold">Prevent Abuse:</span> We may view or use your data to identify patterns of abuse.</li>
            </ul>
            <h3 className="text-2xl font-bold mb-2 mt-3.5">Legal Basis for Processing (GDPR)</h3>
            <ul className="list-disc list-inside">
              <li className="mb-1"><span className="font-bold">Consent:</span> You provide consent when creating an account and agreeing to this policy.</li>
              <li><span className="font-bold">Legitimate Interest:</span> We process data to maintain service security and functionality.</li>
            </ul>
            <h2 className="text-3xl font-bold mt-8">IV. Your Data: Protection and Management</h2>
            <p className="my-2">LibreCloud stores data on servers which are rented from several hosting providers (e.g. Namecheap), which may change at any time. All users are notified of any change in location of their data.</p>
            <h3 className="text-2xl font-bold mb-2 mt-3.5">Data Storage</h3>
            <ul className="list-disc list-inside">
              <li className="mb-1">Your data can only be accessed by administrators of LibreCloud.</li>
              <li className="my-1">Your data is stored in formats intended to be usable and compatible with other platforms.</li>
              <li className="mt-1">Backups of your data are stored on consumer-grade HDDs. See below for security practices.</li>
            </ul>
            <h3 className="text-2xl font-bold mb-2 mt-3.5">Data Security</h3>
            <ul className="list-disc list-inside">
              <li className="mb-1">While we take reasonable steps to protect data, we cannot guarantee 100% security.</li>
              <li className="my-1">We actively monitor for data breaches and unauthorized access.</li>
              <li className="my-1">If we suspect a compromise of your data, we will notify you through the methods you have provided us with.</li>
              <li className="my-1">Backups are encrypted at rest with LUKS and in cold storage. We have physical possession of these drives. If these drives are ever physically moved to another location, you will be notified of the time frame of their transfer. These drives are never connected to the Internet.</li>
              <li className="mt-1">While maximum effort has been made to ensure data on all services provided by us is encrypted, not all services have their data encrypted (e.g. Gitea) due to technical limitations.</li>
            </ul>
            <h3 className="text-2xl font-bold mb-2 mt-3.5">Data Retention</h3>
            <ul className="list-disc list-inside">
              <li className="mb-1">Data not required for operating your user account or LibreCloud (e.g. logs, outdated profile data) is regularly deleted from our servers.</li>
              <li className="my-1">We retain logs for three months, unless required by us to provide stable services. Logs are deleted on a regular basis, either manually or automatically.</li>
              <li className="mt-1">We will retain your user data until you request for it to be deleted, and for a maximum duration of the lifetime of the associated service or services, should it cease operation at any point.</li>
            </ul>
            <h3 className="text-2xl font-bold mb-2 mt-3.5">Data Processing</h3>
            <p className="my-2">We process data based on your consent (for account creation) and our legitimate interest in maintaining service security and functionality.</p>
            <h2 className="text-3xl font-bold mt-8">V. Your Rights As A User</h2>
            <p className="my-2">LibreCloud is proud to offer maximum user control over their data. If you choose to make a request to exercise one of these rights, we will fulfill it within 48 hours.</p>
            <p className="my-2">Additional rights not listed above may be requested through LibreCloud&#39;s support system, though their approval cannot be guaranteed.</p>
            <p className="my-2 font-bold">You have the right to:</p>
            <ul className="list-disc list-inside">
              <li className="mb-1">Request the deletion of all of your user data at any time, and for any reason.</li>
              <li className="my-1">Correct inaccuracies or modify account information, data, and history. You may also be provided with the option to additionally remove records of this data change request.</li>
              <li className="my-1">Opt out of non-essential communications.</li>
              <li className="my-1">Request a copy of your data in a portable format (e.g. JSON, CSV).</li>
              <li className="mt-1">Object to automated decision-making (though we do not use it).</li>
            </ul>
            <h2 className="text-3xl font-bold mt-8">VI. Cookies And Tracking</h2>
            <p className="my-2">We do not use cookies or tracking tools beyond what is required for the services we operate. Review their respective documentation for details on their practices.</p>
            <h2 className="text-3xl font-bold mt-8">VII. Policy Changes</h2>
            <p className="my-2">We may update this policy to reflect changes in our services, organization, or other reasons. Updates will be posted on this page with a revised effective date.</p>
            <p className="my-2">Large changes to policies will be announced via email and addressed to your LibreCloud account email.</p>
            <p className="my-2">By continuing to use LibreCloud after these changes have been made, you agree to the updated policy.</p>
            <h2 className="text-3xl font-bold mt-8">VIII. Contact LibreCloud</h2>
            <p className="my-2">If you have further comments or questions, you may use the support options provided in the user dashboard on LibreCloud, or through the methods provided below:</p>
            <p className="my-2"><span className="font-bold">Email:</span> <Link href="mailto:support@librecloud.cc" className="underline">support@librecloud.cc</Link></p>
            <p className="my-2">You may reach our privacy contact, Aidan Honor, at the above address or <Link href="mailto:aidan@p0ntus.com" className="underline">aidan@p0ntus.com</Link>.</p>
            <p className="my-2">Mailing address available upon request.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}