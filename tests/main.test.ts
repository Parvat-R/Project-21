// Testing here
/** @jest-environment node */
import { GET } from '../src/app/api/user/route';
it('should return data with status 200', async () => {
    const response = await GET();
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.length).toBeGreaterThan(0);
});