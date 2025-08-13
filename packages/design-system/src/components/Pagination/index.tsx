function range(start: number, end: number): number[] {
  const out: number[] = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}

interface UsePaginationParams {
  totalPages: number;
  currentPage: number | string;
  siblingCount?: number;
}

type PaginationItem = number | 'ELLIPSIS';

function usePagination({ totalPages, currentPage, siblingCount = 1 }: UsePaginationParams): PaginationItem[] {
  const totalNumbers = siblingCount * 2 + 5;
  if (totalPages <= totalNumbers) return range(1, totalPages);

  const cur = Number(currentPage) || 1;
  const leftSibling = Math.max(cur - siblingCount, 1);
  const rightSibling = Math.min(cur + siblingCount, totalPages);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);
    return [...leftRange, 'ELLIPSIS', totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(totalPages - rightItemCount + 1, totalPages);
    return [1, 'ELLIPSIS', ...rightRange];
  }

  const middleRange = range(leftSibling, rightSibling);
  return [1, 'ELLIPSIS', ...middleRange, 'ELLIPSIS', totalPages];
}

export type PaginationProps = {
  totalPages: number;
  currentPage: number | string;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

export function Pagination({ totalPages, currentPage, onPageChange, siblingCount = 1, className = '' }: PaginationProps) {
  const items = usePagination({ totalPages, currentPage, siblingCount });
  const cur = Number(currentPage);

  return (
    <nav className={`tds-pagination ${className}`} aria-label="Pagination">
      <ul>
        {items.map((item, idx) =>
          item === 'ELLIPSIS' ? (
            <li key={`e-${idx}`} className="tds-ellipsis">...</li>
          ) : (
            <li key={item}>
              <button
                type="button"
                onClick={() => Number(item) !== cur && onPageChange(Number(item))}
                aria-current={Number(item) === cur ? 'page' : undefined}
                disabled={Number(item) === cur}
              >
                {item}
              </button>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}
