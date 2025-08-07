'use client'

import { useState } from 'react'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
  inquiryType: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Simulate form submission - replace with actual submission logic
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'general',
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-xl bg-white p-8 shadow-xl">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Send a Message</h2>

      {submitStatus === 'success' && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
          <p className="text-green-800">Thank you for your message! I'll get back to you soon.</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-red-800">
            Sorry, there was an error sending your message. Please try again.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-teal-500"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-teal-500"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        {/* Inquiry Type */}
        <div>
          <label htmlFor="inquiryType" className="mb-2 block text-sm font-medium text-gray-700">
            Type of Inquiry
          </label>
          <select
            id="inquiryType"
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-teal-500"
          >
            <option value="general">General Inquiry</option>
            <option value="commission">Commission Request</option>
            <option value="exhibition">Exhibition Collaboration</option>
            <option value="press">Press/Interview</option>
            <option value="purchase">Artwork Purchase</option>
          </select>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-teal-500"
            placeholder="Brief subject line"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-teal-500"
            placeholder="Tell me about your project or inquiry..."
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex w-full justify-center rounded-md border border-transparent px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors duration-200 ${
              isSubmitting
                ? 'cursor-not-allowed bg-gray-400'
                : 'bg-teal-600 hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
