
const SelectedRow = ({ selectedAsset }) => {
    return (
        <>
            <div className="relative flex-col flex mb-4">
                <div className="h-72 w-full rounded-3xl" style={{ background: selectedAsset?.color || '#565b6b' }}></div>
                <div className="text-white text-2xl absolute bottom-8 left-8">{selectedAsset?.title || `Press "Enter" to select an asset `}</div>
            </div></>
    );
}

export default SelectedRow;