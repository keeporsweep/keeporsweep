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

	public function  __construct($appName, IRequest $request, IRootFolder $rootFolder, ?string $userId = null) {
		parent::__construct($appName, $request);
		$this->rootFolder = $rootFolder;
		$this->userId = $userId;
	}

	/**
	 * @NoAdminRequired
	 */
	public function files() {
		$files = $this->getFilesRecursive();
		$results = \OCA\Files\Helper::formatFileInfos($files);
		foreach ($results as $key => $result) {
			$path = $this->getRelativePath($files[$key]->getPath());
			$results[$key]['path'] = $path;
		}

		return new DataResponse($results);
	}

	private function getFilesRecursive(& $results = [], $path = '') {
		$userFolder = $this->rootFolder->getUserFolder($this->userId);
		$files = $userFolder->get($path)->getDirectoryListing();
		foreach($files as $file) {
			if ($file->getType() === 'dir') {
				$this->getFilesRecursive($results, $path . '/' . $file->getName());
			} else {
				$results[] = $file->getFileInfo();
			}
		}

		return $results;
	}

	private function getRelativePath($path) {
		$path = Filesystem::getView()->getRelativePath($path);
		return substr($path, 0, strlen($path) - strlen(basename($path)));
	}

}
