<?php
namespace OCA\RandomDeclutter\Controller;

use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OC\Files\Filesystem;

class ApiController extends Controller {

	/**
	 * @NoAdminRequired
	 */
	public function files() {
		$files = $this->getFilesRecursive();
		$files = \OCA\Files\Helper::formatFileInfos($files);
		
		return new DataResponse($files);
	}

	private function getFilesRecursive(& $results = [], $path = '') {
		$files = FileSystem::getDirectoryContent($path);
		foreach($files as $file) {
			if ($file->getType() === 'dir') {
				$this->getFilesRecursive($results, $path . '/' . $file->getName());
			} else {
				$results[] = $file;
			}
		}

		return $results;
	}

}
