import HomeLayout from "../components/layouts/HomeLayout";
import HomeComponent from "../components/pages/home/Home";
export const metadata = {
  title: 'Home | Think Trail',
};

export default function HomePage() {
  return (
    <HomeLayout>
      <HomeComponent />
    </HomeLayout>
  );
}
