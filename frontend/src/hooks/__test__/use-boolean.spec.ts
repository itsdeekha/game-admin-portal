import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useBoolean } from '../use-boolean';

describe('useBoolean Hook', () => {
  describe('Initial State', () => {
    it('initializes with false when no default value provided', () => {
      const { result } = renderHook(() => useBoolean());

      expect(result.current.value).toBe(false);
    });

    it('initializes with false when defaultValue is falsy', () => {
      const { result } = renderHook(() => useBoolean(undefined));

      expect(result.current.value).toBe(false);
    });

    it('initializes with true when defaultValue is true', () => {
      const { result } = renderHook(() => useBoolean(true));

      expect(result.current.value).toBe(true);
    });

    it('initializes with true when defaultValue is truthy', () => {
      const { result } = renderHook(() => useBoolean('hello' as any));

      expect(result.current.value).toBe(true);
    });
  });

  describe('Return Interface', () => {
    it('returns correct interface structure', () => {
      const { result } = renderHook(() => useBoolean());

      expect(result.current).toHaveProperty('value');
      expect(result.current).toHaveProperty('onTrue');
      expect(result.current).toHaveProperty('onFalse');
      expect(result.current).toHaveProperty('onToggle');
      expect(result.current).toHaveProperty('setValue');

      expect(typeof result.current.value).toBe('boolean');
      expect(typeof result.current.onTrue).toBe('function');
      expect(typeof result.current.onFalse).toBe('function');
      expect(typeof result.current.onToggle).toBe('function');
      expect(typeof result.current.setValue).toBe('function');
    });
  });

  describe('onTrue Function', () => {
    it('sets value to true when called', () => {
      const { result } = renderHook(() => useBoolean(false));

      expect(result.current.value).toBe(false);

      act(() => {
        result.current.onTrue();
      });

      expect(result.current.value).toBe(true);
    });
  });

  describe('onFalse Function', () => {
    it('sets value to false when called', () => {
      const { result } = renderHook(() => useBoolean(true));

      expect(result.current.value).toBe(true);

      act(() => {
        result.current.onFalse();
      });

      expect(result.current.value).toBe(false);
    });
  });

  describe('onToggle Function', () => {
    it('can be called multiple times consecutively', () => {
      const { result } = renderHook(() => useBoolean(false));

      expect(result.current.value).toBe(false);

      act(() => {
        result.current.onToggle(); // false → true
      });
      expect(result.current.value).toBe(true);

      act(() => {
        result.current.onToggle(); // true → false
      });
      expect(result.current.value).toBe(false);

      act(() => {
        result.current.onToggle(); // false → true
      });
      expect(result.current.value).toBe(true);
    });
  });

  describe('setValue Function', () => {
    it('sets value directly with boolean', () => {
      const { result } = renderHook(() => useBoolean(false));

      expect(result.current.value).toBe(false);

      act(() => {
        result.current.setValue(true);
      });

      expect(result.current.value).toBe(true);

      act(() => {
        result.current.setValue(false);
      });

      expect(result.current.value).toBe(false);
    });
  });
});
