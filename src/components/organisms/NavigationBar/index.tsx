import Link from 'next/link';

const NavigationBar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex">
          <Link href="/epub" passHref>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              epub
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
