import { firstLetterUpperCase } from '../formatStrings';

describe('Testing formatString helper functions', () => {
	it('should transform a string with the first letter in uppercase', () => {
		expect(firstLetterUpperCase('teaminternational')).toBe('Teaminternational');
	});
});
