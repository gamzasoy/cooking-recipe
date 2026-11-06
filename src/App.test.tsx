import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './App';
import { FAVORITES_KEY } from './hooks/useFavorites';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

describe('홈 화면', () => {
  it('검색과 카테고리 필터가 동작한다', async () => {
    const user = userEvent.setup();
    renderAt('/');
    expect(screen.getByRole('heading', { name: '김치찌개' })).toBeInTheDocument();

    await user.type(screen.getByLabelText('레시피 검색'), '파스타');
    expect(screen.queryByRole('heading', { name: '김치찌개' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '베이컨 크림 파스타' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '디저트' }));
    expect(screen.getByText(/검색 결과가 없어요/)).toBeInTheDocument();
  });

  it('즐겨찾기를 추가하면 뱃지와 즐겨찾기 페이지, 저장소에 반영된다', async () => {
    const user = userEvent.setup();
    renderAt('/');
    await user.click(screen.getByRole('button', { name: '떡볶이 즐겨찾기 추가' }));
    expect(JSON.parse(localStorage.getItem(FAVORITES_KEY)!)).toEqual(['tteokbokki']);

    await user.click(screen.getByRole('link', { name: /즐겨찾기/ }));
    expect(screen.getByRole('heading', { name: '즐겨찾기' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '떡볶이' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '김치찌개' })).not.toBeInTheDocument();
  });
});

describe('상세 화면', () => {
  it('인분을 바꾸면 재료 양이 바뀐다', async () => {
    const user = userEvent.setup();
    renderAt('/recipe/kimchi-jjigae');
    const tofu = screen.getByText('두부').closest('li')!;
    expect(within(tofu).getByText('½모')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '인분 늘리기' }));
    await user.click(screen.getByRole('button', { name: '인분 늘리기' }));
    expect(screen.getByTestId('servings')).toHaveTextContent('4인분');
    expect(within(tofu).getByText('1모')).toBeInTheDocument();
    expect(within(screen.getByText('신김치').closest('li')!).getByText('600g')).toBeInTheDocument();
  });

  it('단계 타이머가 카운트다운 후 완료된다', () => {
    vi.useFakeTimers();
    try {
      renderAt('/recipe/tteokbokki');
      const timer = screen.getByRole('timer', { name: '4단계 타이머' });
      expect(timer).toHaveTextContent('01:00');
      act(() => within(timer).getByRole('button', { name: '시작' }).click());
      act(() => vi.advanceTimersByTime(30_000));
      expect(timer).toHaveTextContent('00:30');
      act(() => within(timer).getByRole('button', { name: '일시정지' }).click());
      act(() => vi.advanceTimersByTime(10_000));
      expect(timer).toHaveTextContent('00:30');
      act(() => within(timer).getByRole('button', { name: '계속' }).click());
      act(() => vi.advanceTimersByTime(31_000));
      expect(timer).toHaveTextContent('완료!');
    } finally {
      vi.useRealTimers();
    }
  });

  it('없는 레시피는 안내 문구를 보여준다', () => {
    renderAt('/recipe/nope');
    expect(screen.getByText(/레시피를 찾을 수 없어요/)).toBeInTheDocument();
  });
});
