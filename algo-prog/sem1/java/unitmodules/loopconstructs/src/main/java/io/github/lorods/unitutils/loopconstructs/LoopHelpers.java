package io.github.lorods.unitutils.loopconstructs;

import java.util.Arrays;

public class LoopHelpers {
	private static boolean chkSimpleNatPrimality(int chkdprim, double ceildsqrt) {
		int mod;
		// System.out.printf("got to line 57, sqrtceil: %.2f\n", ceildsqrt);
		for (int i = 3; i <= ceildsqrt; i += 2) {
			mod = chkdprim % i;
			if (mod == 0) {
				System.out.printf("O número %d não é primo.\n", chkdprim);
				return false;
			}
		}
		System.out.printf("O número %d é primo.\n", chkdprim);
		return true;
	}

	/**
	 * @param sortd: dummy array to sort and retrieve max and min from
	 */
	private static int[] getSimpleBounds(int[] sortd) {
		Arrays.sort(sortd);
		return new int[] { sortd[0], sortd[(sortd.length - 1)] };
	}
}
