export function Footer() {
  return (
    <footer className="bg-[#222222] text-gray-400 py-12 text-xs leading-relaxed border-t-4 border-gray-600">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h5 className="text-white font-bold uppercase mb-4 tracking-wider text-sm font-sans">
            Main Office
          </h5>
          <p className="mb-2">
            <strong className="text-white">
              International Tour Operator License:
            </strong>{" "}
            79-0481/2018/TCDL-GP LHQT
          </p>
          <p className="mb-2">
            <strong className="text-white">Address:</strong> 1st Floor, IBC
            Building, 1A Cong Truong Me Linh, Saigon Ward, Ho Chi Minh City,
            Vietnam
          </p>
          <p className="mb-2">
            <strong className="text-white">Office Hour:</strong> 9AM to 6PM from
            Monday to Friday
          </p>
          <p className="mb-2">
            <strong className="text-white">Hotline:</strong> (+84) 78 592 0018
            (call or iMessage, WhatsApp)
          </p>
          <p className="mb-2">
            <strong className="text-white">Tel:</strong> +84 (0) 28 3827 5000
          </p>
          <p className="mb-2">
            <strong className="text-white">Reservation Email:</strong>{" "}
            bookings@foodietour.com
          </p>
          <p>
            <strong className="text-white">Sales Email:</strong>{" "}
            sales@foodietour.com
          </p>
        </div>
        <div>
          <h5 className="text-white font-bold uppercase mb-4 tracking-wider text-sm font-sans">
            Ticket Kiosk
          </h5>
          <p className="mb-2">
            <strong className="text-white">Address:</strong> At entrance of Bach
            Dang Pier, District 1
          </p>
          <p className="mb-2">
            <strong className="text-white">Hotline:</strong> +84 909 534 259
            (call or iMessage, WhatsApp)
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end">
          <h5 className="text-white font-bold uppercase mb-4 tracking-wider text-sm font-sans">
            Follow Us
          </h5>
          <div className="mt-4 opacity-70">
            <span className="font-display text-white text-lg">FOODIE TOUR</span>
          </div>
        </div>
      </div>
      <div className="text-center mt-12 pt-8 border-t border-gray-700 text-gray-500 font-sans">
        <p>© 2026 Foodie Tour. All rights reserved.</p>
      </div>
    </footer>
  );
}
