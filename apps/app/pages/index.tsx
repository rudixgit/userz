export default function Index() {
	return (
		<div>
			<h1 className="mb-6">Monorepo</h1>
			<h1 className="mb-4">
				In this monorepo app we have a single site with two installed
				dependencies that are available in the same repository.
			</h1>
			<div className="mb-4">
				<li>
					<code>app</code> is the current Next.js site you&apos;re looking at
				</li>
				<li>
					<code>packages/ui</code> is a package that exports the button you see
					below
				</li>
				<li>
					<code>packages/utils</code> is a package that exports a function that
					generates random colors. Click the button to see it in action
				</li>
			</div>
		</div>
	);
}

Index.Layout = Layout;
