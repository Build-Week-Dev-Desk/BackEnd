describe('test environment', function() {
    it('should use the testing environment', function() {
        expect(process.env.NODE_ENV).toBe('testing');
    })
})