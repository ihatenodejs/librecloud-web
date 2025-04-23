import Navbar from "@/components/pages/main/Navbar"
import Footer from "@/components/pages/main/Footer"
import { Scale } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function Terms() {
  return (
    <div className="min-h-screen dark:bg-linear-to-b dark:from-gray-950 dark:to-gray-900">
      <Navbar />
      <main>
        <div className="pt-4 lg:pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Scale className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0" />
              <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                Terms of Service
              </h1>
            </div>
            <h3 className="text-2xl text-muted-foreground my-4">
              LibreCloud is a community-driven project to provide free and open-source cloud services to the public.
            </h3>
            <h4 className="text-xl"><span className="font-bold">Date Effective:</span> 21 April 2025</h4>
            <Separator className="my-4" />
            
            <h2 className="text-3xl font-bold">I. Introduction & Agreement</h2>
            <p className="my-2">By accessing or using LibreCloud services (&quot;Services&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use our Services.</p>
            <p className="my-2">LibreCloud (&quot;LibreCloud&quot;, &quot;We&quot;, &quot;Us&quot;) is operated by individual volunteers and is not a business. We offer self-hosted open-source software services, including but not limited to Email, Gitea, NextCloud, and Vaultwarden, connected through a unified dashboard.</p>
            <p className="my-2">A user (&quot;User&quot;, &quot;You&quot;, &quot;Your&quot;) refers to an individual who has created an account with LibreCloud and agreed to these Terms.</p>
            <p className="my-2">These Terms should be read in conjunction with our <Link href="/legal/privacy" className="underline">Privacy Policy</Link>, which explains how we handle your data.</p>
            <p className="my-2">LibreCloud is not intended for users under 16 years of age. By using our Services, you declare that you are at least 16 years old.</p>
            
            <h2 className="text-3xl font-bold mt-8">II. User Accounts</h2>
            <p className="my-2">To access most features of LibreCloud, you must create an account. When creating your account, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
            <p className="my-2 font-bold">Account responsibilities:</p>
            <ul className="list-disc list-inside">
              <li className="mb-1">Maintaining the security of your account credentials</li>
              <li className="my-1">Notifying LibreCloud immediately of any unauthorized use of your account</li>
              <li className="my-1">Ensuring all account information is accurate and up-to-date</li>
              <li className="mt-1">Managing the content you store and share through our Services</li>
            </ul>
            <p className="my-2">We reserve the right to suspend or terminate accounts that violate these Terms or that have been inactive for an extended period.</p>
            
            <h2 className="text-3xl font-bold mt-8">III. Acceptable Use</h2>
            <p className="my-2">LibreCloud Services are designed to help you manage and share your data in a privacy-respecting way. By using our Services, you agree not to:</p>
            <ul className="list-disc list-inside">
              <li className="mb-1">Use the Services for any illegal purpose or to violate any laws</li>
              <li className="my-1">Upload, store, or share content that infringes intellectual property rights</li>
              <li className="my-1">Distribute malware, viruses, or other harmful computer code</li>
              <li className="my-1">Attempt to gain unauthorized access to any part of the Services</li>
              <li className="my-1">Interfere with or disrupt the integrity or performance of the Services</li>
              <li className="my-1">Harass, abuse, or harm others through our Services</li>
              <li className="my-1">Use our Services to send unsolicited communications (spam)</li>
              <li className="mt-1">Attempt to bypass any usage limitations or quotas implemented in the Services</li>
            </ul>
            <p className="my-2">We reserve the right to remove content and/or suspend accounts that violate these policies.</p>
            
            <h3 className="text-2xl font-bold mb-2 mt-3.5">Resource Usage</h3>
            <p className="my-2">LibreCloud operates off of donated resources. We may implement fair usage policies to ensure service availability for all users. These policies may include storage limits, bandwidth restrictions, or other resource constraints as needed. We will provide reasonable notice before implementing or changing such policies.</p>
            
            <h2 className="text-3xl font-bold mt-8">IV. Service Availability and Modifications</h2>
            <p className="my-2">As a volunteer-run project, LibreCloud makes reasonable efforts to maintain service availability, but we do not guarantee uninterrupted access to our Services.</p>
            <ul className="list-disc list-inside">
              <li className="mb-1">We may perform maintenance that could temporarily limit access to the Services</li>
              <li className="my-1">We will make reasonable efforts to notify users of planned maintenance</li>
              <li className="my-1">We reserve the right to modify, suspend, or discontinue any part of our Services at any time</li>
              <li className="mt-1">We may add, remove, or change features as needed to improve our Services</li>
            </ul>
            <p className="my-2">In the event we decide to discontinue a service, we will provide at least 30 days&apos; notice and reasonable opportunity for you to export your data.</p>
            
            <h2 className="text-3xl font-bold mt-8">V. User Content</h2>
            <p className="my-2">LibreCloud allows you to store, share, and manage various types of content (&quot;User Content&quot;). You retain all rights to your User Content, subject to the limited license granted below.</p>
            
            <h3 className="text-2xl font-bold mb-2 mt-3.5">Content Ownership</h3>
            <p className="my-2">You are the owner of the content you create and store on LibreCloud. Your data will not be used by LibreCloud for any purpose other than to provide you with the services you have requested.</p>
            
            <h3 className="text-2xl font-bold mb-2 mt-3.5">Content Responsibility</h3>
            <p className="my-2">You are solely responsible for your User Content and the consequences of storing or sharing it through our Services. LibreCloud is not responsible for the accuracy, quality, integrity, legality, reliability, or appropriateness of User Content.</p>
            
            <h3 className="text-2xl font-bold mb-2 mt-3.5">Content Removal</h3>
            <p className="my-2">While we do not actively monitor User Content, we reserve the right to remove any content that violates these Terms or that we are obligated to remove by law. We will notify you if your content is removed, unless prohibited by law.</p>
            
            <h2 className="text-3xl font-bold mt-8">VI. Intellectual Property</h2>
            <p className="my-2">LibreCloud Services utilize various open-source software components, each governed by their respective licenses. We respect the intellectual property of others and expect users to do the same.</p>
            
            <h2 className="text-3xl font-bold mt-8">VII. Disclaimers and Limitations</h2>
            <p className="my-2">LibreCloud Services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. To the fullest extent permitted by law, we disclaim all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
            <p className="my-2">While we implement reasonable security measures to protect your data, we cannot guarantee that your data will always be secure or that our Services will be error-free.</p>
            <p className="my-2">To the fullest extent permitted by law, LibreCloud shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Services.</p>
            <p className="my-2">Our total liability for any claim arising from or related to these Terms or the Services shall not exceed the amount you have paid us, if any, for the Services in the twelve months preceding the claim.</p>
            
            <h2 className="text-3xl font-bold mt-8">VIII. Termination</h2>
            <p className="my-2">You may terminate your account at any time by following the instructions provided in your account settings. Upon termination, your right to access and use the Services will cease immediately.</p>
            <p className="my-2">We may terminate or suspend your access to the Services at any time, with or without cause, and with or without notice. Reasons for termination may include:</p>
            <ul className="list-disc list-inside">
              <li className="mb-1">Violation of these Terms</li>
              <li className="my-1">Requests by law enforcement or government agencies</li>
              <li className="my-1">Extended periods of inactivity</li>
              <li className="mt-1">Unexpected technical issues or service discontinuation</li>
            </ul>
            <p className="my-2">Upon termination, we will provide an opportunity for you to download your data where feasible, unless prohibited by law.</p>
            
            <h2 className="text-3xl font-bold mt-8">IX. Changes to Terms</h2>
            <p className="my-2">We may update these Terms from time to time to reflect changes in our Services, organization, or for other reasons. We will notify you of any material changes by posting the updated Terms on our website and sending an email to the address associated with your account.</p>
            <p className="my-2">Your continued use of LibreCloud after the changes take effect constitutes your acceptance of the revised Terms. If you do not agree to the revised Terms, you should discontinue use of our Services and close your account.</p>
            
            <h2 className="text-3xl font-bold mt-8">X. Governing Law</h2>
            <p className="my-2">These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where LibreCloud has its principal operations, without regard to its conflict of law provisions.</p>
            <p className="my-2">Any disputes arising under these Terms that cannot be resolved amicably shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.</p>
            
            <h2 className="text-3xl font-bold mt-8">XI. Contact Information</h2>
            <p className="my-2">If you have any questions about these Terms, please contact us through the support options provided in the user dashboard on LibreCloud, or through the methods provided below:</p>
            <p className="my-2"><span className="font-bold">Email:</span> <Link href="mailto:support@librecloud.cc" className="underline hover:text-muted-foreground transition-all">support@librecloud.cc</Link></p>
            <p className="my-2">Mailing address available upon request.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}