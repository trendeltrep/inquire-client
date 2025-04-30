import { Button } from '@mui/material';

interface Props {
  onNext: () => void;
  onPrev: () => void;
  page: number;
  hasNextPage: boolean;
}

export default function PaginationControls({ onNext, onPrev, page, hasNextPage }: Props) {
  return (
    <div className="flex gap-4 justify-center mt-8">
      <Button variant="outlined" onClick={onPrev} disabled={page === 1}>
        Previous
      </Button>
      <Button variant="contained" onClick={onNext} disabled={!hasNextPage}>
        Next
      </Button>
    </div>
  );
}
