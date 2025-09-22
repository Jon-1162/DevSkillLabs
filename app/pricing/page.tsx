import { PricingTable } from '@clerk/nextjs'
import Header from '../components/Header';

export default function PricingPage() {
  const hasClerkKeys = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY;
  
  return (
    <div>
        <Header pricingPage = {true}/>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Unlock the full power of DevSkillSets analytics
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {hasClerkKeys ? (
            <PricingTable />
          ) : (
            <div className="text-center py-12">
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  Demo Mode Active
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You currently have full access to all features. Pricing will be available when authentication is configured.
                </p>
              </div>
              <div className="text-left max-w-2xl mx-auto">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Current Features:</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Full access to all job market data
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Interactive skill analysis charts
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Network graph visualizations
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Multiple role and location filters
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  )
}