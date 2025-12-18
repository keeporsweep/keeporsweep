<?php
namespace OCA\KeepOrSweep\Controller;

use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\Files\IRootFolder;
use OCP\IRequest;
use OC\Files\Filesystem;

class ApiController extends Controller {

	private IRootFolder $rootFolder;
	private ?string $userId;

	public function __construct($appName, IRequest $request, IRootFolder $rootFolder, ?string $userId = null) {
		parent::__construct($appName, $request);
		$this->rootFolder = $rootFolder;
		$this->userId = $userId;
	}

	/**
	 * @NoAdminRequired
	 */
	public function files(): DataResponse {
		// Collect all files for the current user
		$fileInfos = $this->getFilesRecursive();

		// Manually format file info instead of using the removed
		// \OCA\Files\Helper::formatFileInfos()
		$results = [];
		foreach ($fileInfos as $fileInfo) {
			// Basic fields that the frontend actually uses
			$entry = [
				'id'       => $fileInfo->getId(),
				'name'     => $fileInfo->getName(),
				'mimetype' => $fileInfo->getMimetype(),
				'mtime'    => $fileInfo->getMTime() * 1000, // ms, similar to core helper
				'size'     => $fileInfo->getSize(),
				'type'     => $fileInfo->getType(),
			];

			// Add relative path (directory only, no filename)
			$path = $this->getRelativePath($fileInfo->getPath());
			$entry['path'] = $path;

			$results[] = $entry;
		}

		return new DataResponse($results);
	}

	/**
	 * Recursively collect FileInfo objects under the given path.
	 *
	 * @param array $results
	 * @param string $path
	 * @return array
	 */
	private function getFilesRecursive(array &$results = [], string $path = ''): array {
		$userFolder = $this->rootFolder->getUserFolder($this->userId);
		$dirNode = $userFolder->get($path);
		$files = $dirNode->getDirectoryListing();

		foreach ($files as $file) {
			if ($file->getType() === 'dir') {
				$this->getFilesRecursive($results, $path . '/' . $file->getName());
			} else {
				$results[] = $file->getFileInfo();
			}
		}

		return $results;
	}

	/**
	 * Convert an absolute path to a path relative to the user view,
	 * then strip the filename so we only keep the directory portion.
	 *
	 * @param string $path
	 * @return string
	 */
	private function getRelativePath(string $path): string {
		$relative = Filesystem::getView()->getRelativePath($path);
		// remove the basename (file name) from the path, keep trailing slash semantics
		return substr($relative, 0, strlen($relative) - strlen(basename($relative)));
	}
}
