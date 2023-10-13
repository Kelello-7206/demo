// pages/api/preview/[id].js

import { useRouter } from 'next/router';
import PreviewComponent from '../../../components/preview';

const PreviewPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <PreviewComponent id={id} />;
};

export default PreviewPage;
