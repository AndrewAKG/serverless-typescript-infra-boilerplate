import { Injector } from '@sailplane/injector';

/**
 * Get instance of a class.
 * This is a wrapper for the lib service to get a particular service.
 *
 * @param service the class to fetch. Ex: MyClass. NOT an instance, the class.
 * @return the singleton instance of the requested class, undefined if not registered.
 */
export function get<T>(service: { new (...args): T }): T | undefined {
	return Injector.get(service);
}
