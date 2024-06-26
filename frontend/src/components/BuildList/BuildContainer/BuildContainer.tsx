import { Props } from "./BuildContainerProps";
import { memo } from "react";
import cn from "classnames";
import BuildItem from "../BuildItem/BuildItem";





function BuildContainer({
  buildItem,
  handleDeleteItem,
  className,
}: Props) {

  const { components, name: title, category } = buildItem;

  return (
      <>
      {components.length > 0 && (
        <ul className="grid">
          {components.map((component, index) => (
              <BuildItem
                key={index}
                className={cn(className, 'py-5')}
                index={index}
                handleDeleteItem={handleDeleteItem}
                title={title}
                category={category}
                part={component}
              />
          ))}
        </ul>
      )}
      </>
  );
}



export default memo(BuildContainer);
