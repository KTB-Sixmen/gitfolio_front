import { Suspense } from 'react';
import Community from './_components/community';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Community />
    </Suspense>
  );
}
