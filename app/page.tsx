'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { config, isFeatureEnabled, isProviderEnabled } from '@/lib/config'
import { useAuth } from '@/lib/auth'
import { LoginForm } from '@/components/auth/LoginForm'
import { SignupForm } from '@/components/auth/SignupForm'
import { LayoutVariants } from '@/components/layout/PageLayout'
import { useState } from 'react'

export default function Home() {
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const { user, isAuthenticated, isAuthEnabled } = useAuth()

  const handleAuthSuccess = () => {
    setShowAuth(false)
  }

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login')
  }

  return (
    <LayoutVariants.Landing>
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            RR Real Estate Portfolio
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover luxurious student housing and premium rental properties tailored for the modern college experience.
          </p>
        </div>

        {/* Featured Student Housing/Rental Properties Section */}
        <section className="py-16 bg-surface rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold tracking-tight mb-8 text-text">
            Featured Student Housing & Rental Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {/* Placeholder for property cards */}
            <Card className="bg-background border-border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
              <img src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Property 1" className="w-full h-48 object-cover"/>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-text">Modern Loft Apartments</CardTitle>
                <CardDescription className="text-textSecondary">Downtown Campus Living</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-textSecondary mb-4">Spacious, fully furnished lofts with city views, perfect for students seeking a vibrant urban lifestyle.</p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">View Details</Button>
              </CardContent>
            </Card>

            <Card className="bg-background border-border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
              <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Property 2" className="w-full h-48 object-cover"/>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-text">Suburban Student Homes</CardTitle>
                <CardDescription className="text-textSecondary">Quiet Neighborhood Retreat</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-textSecondary mb-4">Comfortable homes with private yards, ideal for group living and a peaceful study environment.</p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">View Details</Button>
              </CardContent>
            </Card>

            <Card className="bg-background border-border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
              <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Property 3" className="w-full h-48 object-cover"/>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-text">Luxury Studio Apartments</CardTitle>
                <CardDescription className="text-textSecondary">Modern & Convenient</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-textSecondary mb-4">Sleek, fully equipped studio apartments offering privacy and all amenities for independent student living.</p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">View Details</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Authentication Section - Retained for potential future use, but hidden by default */}
        {isAuthEnabled && (
          <div className="space-y-4 hidden"> {/* Hidden for now */}
            {isAuthenticated ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800">
                  Welcome back, {user?.name || user?.email}! 🎉
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Button 
                  size="lg" 
                  onClick={() => setShowAuth(true)}
                >
                  {authMode === 'login' ? 'Sign In' : 'Create Account'}
                </Button>
                
                {showAuth && (
                  <div className="flex justify-center">
                    {authMode === 'login' ? (
                      <LoginForm 
                        onSuccess={handleAuthSuccess}
                        onSwitchToSignup={toggleAuthMode}
                      />
                    ) : (
                      <SignupForm 
                        onSuccess={handleAuthSuccess}
                        onSwitchToLogin={toggleAuthMode}
                      />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Feature Status - Retained for debugging/info, but can be hidden */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 hidden"> {/* Hidden for now */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isFeatureEnabled('authentication') ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className="text-sm text-muted-foreground">
                  {isFeatureEnabled('authentication') ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Database</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isFeatureEnabled('database') ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className="text-sm text-muted-foreground">
                  {isFeatureEnabled('database') ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isFeatureEnabled('payments') ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className="text-sm text-muted-foreground">
                  {isFeatureEnabled('payments') ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Real-time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isFeatureEnabled('realtime') ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className="text-sm text-muted-foreground">
                  {isFeatureEnabled('realtime') ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Provider Status - Retained for debugging/info, but can be hidden */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 hidden"> {/* Hidden for now */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>🗄️</span>
                <span>Supabase</span>
                <div className={`w-2 h-2 rounded-full ${isProviderEnabled('supabase') ? 'bg-green-500' : 'bg-gray-300'}`} />
              </CardTitle>
              <CardDescription>
                {isProviderEnabled('supabase') 
                  ? 'PostgreSQL database with built-in auth, real-time subscriptions, and auto-generated APIs.'
                  : 'Supabase not configured. Database features will use local storage fallback.'
                }
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>💳</span>
                <span>Stripe</span>
                <div className={`w-2 h-2 rounded-full ${isProviderEnabled('stripe') ? 'bg-green-500' : 'bg-gray-300'}`} />
              </CardTitle>
              <CardDescription>
                {isProviderEnabled('stripe')
                  ? 'Complete payment processing with checkout, subscriptions, and webhook handling.'
                  : 'Stripe not configured. Payment features will use mock provider.'
                }
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>🎨</span>
                <span>shadcn/ui</span>
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </CardTitle>
              <CardDescription>
                50+ pre-built, accessible components with Tailwind CSS styling.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Configuration Info - Retained for debugging/info, but can be hidden */}
        <div className="mt-12 p-6 bg-muted rounded-lg hidden"> {/* Hidden for now */}
          <h3 className="text-lg font-semibold mb-4">Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>App Name:</strong> {config.app.name}
            </div>
            <div>
              <strong>Theme:</strong> {config.ui.theme}
            </div>
            <div>
              <strong>Primary Color:</strong> {config.ui.primaryColor}
            </div>
            <div>
              <strong>Environment:</strong> {process.env.NODE_ENV}
            </div>
          </div>
        </div>
      </div>
    </LayoutVariants.Landing>
  )
}