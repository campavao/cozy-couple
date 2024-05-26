import Link from "next/link";
import { TemplatePage } from "../components/template-page";

export default function PrivacyPolicy() {
  return (
    <TemplatePage title='Privacy Policy'>
      <p className='py-4'>
        <strong>Last Updated: 05/26/2024</strong>
      </p>

      <p>
        At FlipTrack, we are committed to protecting your privacy. This Privacy
        Policy explains how we collect, use, disclose, and safeguard your
        information when you visit our website fliptrack.app, including any
        other media form, media channel, mobile website, or mobile application
        related or connected thereto (collectively, the &quot;Site&quot;).
        Please read this privacy policy carefully. If you do not agree with the
        terms of this privacy policy, please do not access the site.
      </p>

      <h2 className='py-4'>1. Information We Collect</h2>
      <p>We only collect the following personal information from you:</p>
      <ul className='flex flex-col gap-2 p-4'>
        <li>
          <strong>Name</strong>
        </li>
        <li>
          <strong>Email Address</strong>
        </li>
        <li>
          <strong>Profile Picture</strong>
        </li>
      </ul>
      <p>
        Login to our site is conducted through Google, and payment transactions
        are handled by Stripe. We store payment information that is relevant to
        identify you in case there are transaction issues.
      </p>

      <h2 className='py-4'>2. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul className='flex flex-col gap-2 p-4 list-disc'>
        <li>Provide, operate, and maintain our website.</li>
        <li>Improve, personalize, and expand our website.</li>
        <li>
          Communicate with you, either directly or through one of our partners,
          including for customer service, to provide you with updates and other
          information relating to the website.
        </li>
        <li>Send you emails.</li>
      </ul>

      <h2 className='py-4'>3. Data Storage</h2>
      <p>
        The information you provide is stored in our database. Even if you end
        your subscription, we retain the data unless you explicitly request its
        deletion. You can only access your stored data with an active
        subscription.
      </p>

      <h2 className='py-4'>4. Disclosure of Your Information</h2>
      <p>
        We do not sell, trade, or otherwise transfer your personally
        identifiable information to outside parties. This does not include
        trusted third parties who assist us in operating our website, conducting
        our business, or servicing you, so long as those parties agree to keep
        this information confidential.
      </p>

      <h2 className='pt-4'>5. Third-Party Services</h2>
      <ul className='flex flex-col gap-2 p-4'>
        <li>
          <strong>Google</strong>: For authentication and login purposes.
        </li>
        <li>
          <strong>Stripe</strong>: For payment processing.
        </li>
      </ul>
      <p>
        These third-party services have their own privacy policies addressing
        how they use your information.
      </p>

      <h2 className='py-4'>6. Security of Your Information</h2>
      <p>
        We use administrative, technical, and physical security measures to help
        protect your personal information. While we have taken reasonable steps
        to secure the personal information you provide to us, please be aware
        that despite our efforts, no security measures are perfect or
        impenetrable, and no method of data transmission can be guaranteed
        against any interception or other type of misuse.
      </p>

      <h2 className='py-4'>7. Your Data Protection Rights</h2>
      <p>
        Depending on your location, you may have the following rights regarding
        your personal data:
      </p>
      <ul className='flex flex-col gap-2 p-4'>
        <li>
          <strong>The right to access</strong> – You have the right to request
          copies of your personal data.
        </li>
        <li>
          <strong>The right to rectification</strong> – You have the right to
          request that we correct any information you believe is inaccurate or
          complete information you believe is incomplete.
        </li>
        <li>
          <strong>The right to erasure</strong> – You have the right to request
          that we erase your personal data, under certain conditions.
        </li>
      </ul>

      <h2 className='py-4'>8. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time in order to reflect,
        for example, changes to our practices or for other operational, legal,
        or regulatory reasons. We will notify you of any changes by posting the
        new Privacy Policy on this page.
      </p>

      <h2 className='py-4'>9. Contact Us</h2>
      <p className='pb-4'>
        If you have any questions about this Privacy Policy, please contact us
        at our{" "}
        <Link className='underline' href='/contact'>
          contact page
        </Link>
        .
      </p>
    </TemplatePage>
  );
}
