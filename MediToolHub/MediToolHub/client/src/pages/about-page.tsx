export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About MediTools</h1>

        <div className="prose prose-lg">
          <p className="mb-6">
            At MediTools, we are dedicated to providing healthcare professionals
            with the highest quality medical equipment and tools. Our commitment
            to excellence has made us a trusted partner in the medical industry
            for over a decade.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="mb-6">
            To empower healthcare professionals with reliable, innovative medical
            equipment that enables them to provide the best possible care to
            their patients.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>Quality - We never compromise on the quality of our products</li>
            <li>Innovation - We stay at the forefront of medical technology</li>
            <li>Service - We provide exceptional customer support</li>
            <li>Integrity - We conduct business with honesty and transparency</li>
          </ul>

          <img
            src="https://images.unsplash.com/photo-1516841273335-e39b37888115"
            alt="Healthcare Professional"
            className="w-full rounded-lg my-8"
          />

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Commitment</h2>
          <p>
            We understand the critical role that medical equipment plays in
            patient care. That's why we maintain strict quality control standards
            and work closely with manufacturers to ensure our products meet or
            exceed industry requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
