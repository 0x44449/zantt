import { useRouter } from "next/router";
import React, { Suspense, useEffect, useState } from "react";
import { getProjects } from "@/api/mow/project";

/**
 * @typedef {Zantt.SuspenderActionType<Zantt.ProjectModelType[]>} ResourceFetcher
 */
/**
 * @returns {ResourceFetcher}
 */
const fetchMowData = () => {
  /** @type {Zantt.ApiResponse<Zantt.ProjectModelType[]> | null} */
  let result = null;
  const suspender = getProjects().then(data => {
    result = data;
  }).catch(e => {
    // TODO: handle error
    result = {
      success: false,
      data: null
    }
  });
  return {
    read() {
      if (result === null) {
        throw suspender;
      }
      else {
        if (result.success) {
          return result.data;
        }
        else {
          return result.data;
        }
      }
    }
  }
}

/**
 * @param {{resource: ResourceFetcher}} props 
 * @returns {React.ReactElement}
 */
function MowProjects({resource}) {
  const projects = resource.read();
  return (
    <>
      {projects.map(project => (
        <div key={project.projectId}>{project.projectId} - {project.name}</div>
      ))}
    </>
  )
}

/**
 * @returns {React.ReactElement}
 */
export default function MowApp() {
  const router = useRouter();
  /** @type {{slugs?: string[]}} */
  const { slugs } = router.query;

  /**
   * @typedef {object} MowStateType
   * @property {string} projectId
   * @property {string} taskId
   * @property {string} workspaceId
   */
  /** @type {[MowStateType, React.Dispatch<React.SetStateAction<MowStateType>>]} */
  const [mowState, setMowState] = useState();
  /** @type {[ResourceFetcher, React.Dispatch<React.SetStateAction<ResourceFetcher>>]} */
  const [mowData, setMowData] = useState();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (!slugs) {
      return;
    }
    if (slugs.length != 3) {
      return;
    }

    setMowData(fetchMowData());
    setMowState({
      projectId: slugs[0],
      taskId: slugs[1],
      workspaceId: slugs[2]
    });
  }, [router.isReady]);

  return (
    mowState &&
    <>
      <Suspense fallback={<>Loading...</>}>
        <MowProjects resource={mowData} />
      </Suspense>
    </>
  )
}