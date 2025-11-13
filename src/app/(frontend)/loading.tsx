/**
 * Minimal Professional Loading Screen
 * Clean and elegant loading state
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        {/* Elegant spinner */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        
        {/* School name */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Surjomukhi Kindergarten
        </h2>
        
        {/* Loading text */}
        <p className="text-sm text-gray-500">
          Loading...
        </p>
      </div>
    </div>
  );
}
